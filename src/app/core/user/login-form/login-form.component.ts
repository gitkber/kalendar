import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { User } from '../user';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnChanges {

    @Input() user: User;

    public loginError: Error;
    public loginFormGroup: FormGroup;

    constructor(public authService: AuthService) { }

    ngOnInit() {
        this.loginFormGroup = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
        this.loginFormGroup.valueChanges.subscribe(data => {
            this.user = data
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.user.currentValue !== undefined) {
            this.user = changes.user.currentValue;
            this.loginFormGroup.setValue({
                'email': this.user.lastname,
                'password': this.user.firstname
            });
        }
    }

    login() {
        this.authService.emailLogin(this.loginFormGroup.get('email').value, this.loginFormGroup.get('password').value);
        this.loginError = this.authService.loginError;
    }

}
