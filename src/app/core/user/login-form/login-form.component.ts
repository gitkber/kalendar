import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    public alert = {};
    public user: Observable<firebase.User>;

    public loginFormGroup: FormGroup;

    constructor(private router: Router, public afAuth: AngularFireAuth) {
        this.user = afAuth.authState;
    }

    ngOnInit() {
        this.loginFormGroup = new FormGroup({
            email: new FormControl('toto.test@gmail.com', Validators.required),
            password: new FormControl('bonjour', Validators.required)
        });
    }

    login() {
        this.afAuth.auth.signInWithEmailAndPassword(this.loginFormGroup.get('email').value, this.loginFormGroup.get('password').value)
            .then(success => {
                console.log('success', success)
                this.router.navigateByUrl('/home');
            }).catch(err => {
            console.log('error', err)
            this.alert = {type: 'error', message: err.message}
        });
    }

}
