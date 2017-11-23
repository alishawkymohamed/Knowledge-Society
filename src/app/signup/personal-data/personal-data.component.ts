import { Component, OnInit, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDataService } from '../../shared/user-data.service';
import { PasswordValidation } from './PasswordValidation.ValidationExtension';
import { ApiService } from '../../shared/api.service';
import { Observable } from 'rxjs/Observable';
import { RegisterService } from '../../shared/register.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { StringConversion } from '../../shared/StringConverstion';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalDataComponent implements OnInit {
  public loading = false; //Loader Controller

  User: any;
  personalDataForm: FormGroup;

  firstName: string = null;
  lastName: string = null;
  email: string = null;
  password: string = null;
  confirmPassword: string = null;
  phone: string = null;
  mobile: string = null;
  facebook: string = null;
  instagram: string = null;
  linkedIn: string = null;
  youtube: string = null;
  twitter: string = null;

  constructor(private UserDataService: UserDataService,
    private ApiService: ApiService,
    private RegisterService: RegisterService,
    private router: Router,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);

    this.User = this.UserDataService.getUserData();
    if (this.User !== null) {
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
      'email': new FormControl({ value: this.email, disabled: this.email ? true : false }, [Validators.required, Validators.email]),
      'password': new FormControl(this.password, [Validators.required, Validators.minLength(8)]),
      'confirmPassword': new FormControl(this.password, [Validators.required]),
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
    this.loading = true;
    if (this.personalDataForm.valid) {
      if (this.User == null) {
        this.User = {};
      }
      this.User.FirstName = this.personalDataForm.get('firstName').value;
      this.User.LastName = this.personalDataForm.get('lastName').value;
      this.User.Email = this.personalDataForm.get('email').value;
      this.User.Password = StringConversion.Encrypt(this.personalDataForm.get('password').value);
      this.User.Phone = this.personalDataForm.get('phone').value;
      this.User.Mobile = this.personalDataForm.get('mobile').value;
      this.User.FaceBook = this.personalDataForm.get('facebook').value;
      this.User.Instagram = this.personalDataForm.get('instagram').value;
      this.User.LinkedIn = this.personalDataForm.get('linkedIn').value;
      this.User.Youtube = this.personalDataForm.get('youtube').value;
      this.User.Twitter = this.personalDataForm.get('twitter').value;

      this.RegisterService.SendRegisterData({ TabName: "Personal Data", PersonalData: this.User }).subscribe(
        (Response) => {
          if (Response != false) {
            this.loading = false;
            this.toastr.success("تم تسجيل البيانات بنجاح ..");
            this.router.navigate(['/account', 'signup', 'birthdaydata'])
          }
          else {
            this.loading = false;
            this.toastr.error("لقد حدث خطأ ما .. من فضلك أعد المحاولة لاحقاً !!", 'خطأ!');
          }
        },
        (error) => {
          this.toastr.error(error, 'خطأ!');
        }
      )
    }
    else {
      this.toastr.error("", 'خطأ!');
    }
  }

}
