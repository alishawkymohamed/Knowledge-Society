import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LoginService } from "../shared/login.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as CryptoJS from "crypto-js";
import { StringConversion } from "../shared/StringConverstion";
import { UserDataService } from "../shared/user-data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"],
  encapsulation: ViewEncapsulation.Emulated
})
export class LogInComponent implements OnInit {

  public loading = false; //Loader Controller

  authModel: { email: string, password: string } = { email: '', password: '' };
  title: string = "Sign In";
  @ViewChild("loginForm") loginForm: NgForm;
  wrongCredintials: boolean = false;

  constructor(
    private LoginService: LoginService,
    private router: Router,
    private UserDataService: UserDataService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {

    this.toastr.setRootViewContainerRef(vcr); // Toaster
    const authData = localStorage.getItem(StringConversion.Encrypt("authDataUser"));
    if (authData) {
      this.authModel = JSON.parse(StringConversion.Decrypt(authData));
      this.onSubmit();
    }
  }

  ngOnInit() {

  }

  onSubmit() {
    this.loading = true;
    const email = this.authModel ? StringConversion.Encrypt(this.authModel.email) : StringConversion.Encrypt(this.loginForm.value.email);
    const password = this.authModel ? StringConversion.Encrypt(this.authModel.password) : StringConversion.Encrypt(this.loginForm.value.password);
    this.LoginService.SendLoginData({ 'email': email, 'password': password })
      .subscribe(
      (response) => {
        this.loading = false;
        if (response == false) {
          this.wrongCredintials = true;
        }
        else { // Successful login
          this.UserDataService.setUserData(response);
          if (this.loginForm.value.rememberMe == true) {
            localStorage.removeItem(StringConversion.Encrypt("authDataUser"));
            localStorage.setItem(StringConversion.Encrypt("authDataUser"), StringConversion.Encrypt(JSON.stringify(this.authModel)));
          }
          this.toastr.success("تم الدخول بنجاح ..");
          this.router.navigate(['/account', 'signup']);
        }
      },
      (error) => {
        this.loading = false;
        this.toastr.error(error, 'خطأ!');
      }
      )
  }
}
