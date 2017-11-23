import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UserDataService } from '../../shared/user-data.service'
import { PasswordValidation } from './PasswordValidation.ValidationExtension';
import { ApiService } from '../../shared/api.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalDataComponent implements OnInit {
  User: any;
  personalDataForm: FormGroup;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phone: string = '';
  mobile: string = '';
  facebook: string = '';
  instagram: string = '';
  linkedIn: string = '';
  youtube: string = '';
  twitter: string = '';

  constructor(private UserDataService: UserDataService, private ApiService: ApiService) {
    this.User = this.UserDataService.getUserData();
    if (this.User !== {}) {
      this.firstName = this.User.FirstName;
      this.lastName = this.User.LastName;
      this.email = this.User.Email;
      this.password = this.User.Password;
      this.confirmPassword = this.User.Password;
      this.phone = this.User.Phone;
      this.mobile = this.User.Mobile;
      this.facebook = this.User.Facebook;
      this.instagram = this.User.Instagram;
      this.linkedIn = this.User.LinkedIn;
      this.youtube = this.User.Youtube;
      this.twitter = this.User.Twitter;
    }
  }

  ngOnInit() {
    this.personalDataForm = new FormGroup({
      'firstName': new FormControl(this.firstName, [Validators.required]),
      'lastName': new FormControl(this.lastName),
      'email': new FormControl(this.email, [Validators.required, Validators.email]),
      'password': new FormControl(this.password, [Validators.required, Validators.minLength(8)]),
      'confirmPassword': new FormControl(this.confirmPassword, [Validators.required]),
      'phone': new FormControl(this.phone),
      'mobile': new FormControl(this.mobile),
      'facebook': new FormControl(this.facebook),
      'instagram': new FormControl(this.instagram),
      'linkedIn': new FormControl(this.linkedIn),
      'youtube': new FormControl(this.youtube),
      'twitter': new FormControl(this.twitter)
    }, PasswordValidation.MatchPassword)
  }

  onSubmit() {
    console.log(this.personalDataForm);
    this.User.FirstName = this.firstName;
    this.User.LastName = this.lastName;
    this.User.Email = this.email;
    this.User.Password = this.password;
    this.User.Phone = this.phone;
    this.User.Mobile = this.mobile;
    this.User.FaceBook = this.facebook;
    this.User.Instagram = this.instagram;
    this.User.LinkedIn = this.linkedIn;
    this.User.Youtube = this.youtube;
    this.User.Twitter = this.twitter;

    this.ApiService.ServerRequest('/Register/Save', 'POST', this.User).subscribe(
      (Respond) => {
        this.User = Respond;
        this.UserDataService.setUserData(Respond);
        this.firstName = this.User.FirstName;
        this.lastName = this.User.LastName;
        this.email = this.User.Email;
        this.password = this.User.Password;
        this.phone = this.User.Phone;
        this.mobile = this.User.Mobile;
        this.facebook = this.User.FaceBook;
        this.instagram = this.User.Instagram;
        this.linkedIn = this.User.LinkedIn;
        this.youtube = this.User.Youtube;
        this.twitter = this.User.Twitter;
      },
      (error: Response) => {
        return Observable.throw("لقد حدث خطأ ما .. من فضلك أعد المحاولة لاحقاً !!");
      }
    )
  }

}
