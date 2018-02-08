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
    public formGroup: FormGroup;

    constructor(public authService: AuthService) { }

    ngOnInit() {
        this.formGroup = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
        this.formGroup.valueChanges.subscribe(data => {
            this.user = data
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.user.currentValue !== undefined) {
            this.user = changes.user.currentValue;
            this.formGroup.setValue({
                'email': changes.user.currentValue['$value'] !== null ? this.user.lastname : '',
                'password': changes.user.currentValue['$value'] !== null ? this.user.firstname : ''
            });
        }
    }

    login() {
        if (!this.formGroup.valid) {
            console.log('invalid');
            this.formGroup.get('description').markAsTouched();
        } else {
            this.authService.emailLogin(this.formGroup.get('email').value, this.formGroup.get('password').value);
            this.loginError = this.authService.loginError;
        }
    }

}
