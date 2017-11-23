import { AbstractControl } from '@angular/forms';
import { Validators } from "@angular/forms";
export class PasswordValidation extends Validators {
    static MatchPassword(AC: AbstractControl) {
        debugger;
        let password = AC.get('password').value; // to get value in input tag
        let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (password != confirmPassword) {
            console.log('false');
            AC.get('confirmPassword').setErrors({ MatchPassword: true });
        } else {
            console.log('true');
            return null
        }
    }
}