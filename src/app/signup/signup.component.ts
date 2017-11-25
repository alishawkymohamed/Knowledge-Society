import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class SignupComponent {
  user;
  constructor(private UserDataService: UserDataService) {
    this.user = this.UserDataService.getUserData();
  }
}
