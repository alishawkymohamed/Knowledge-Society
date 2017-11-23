import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserDataService } from '../shared/user-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class SignupComponent {

  constructor(private UserDataService: UserDataService) {

  }
}
