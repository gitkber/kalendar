import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    public loginError: Error;
    public loginFormGroup: FormGroup;

    constructor(public authService: AuthService) { }

    ngOnInit() {
        this.loginFormGroup = new FormGroup({
            email: new FormControl('toto.test@gmail.com', Validators.required),
            password: new FormControl('bonjour', Validators.required)
        });
    }

    login() {
        this.authService.emailLogin(this.loginFormGroup.get('email').value, this.loginFormGroup.get('password').value);
        this.loginError = this.authService.loginError;
    }

}
