import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserDataService } from './user-data.service';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
  private baseUrl = "http://kswebapi.competencysettest.com";
  // private baseUrl = 'http://localhost:2641/';
  constructor(private _http: Http, private UserDataService: UserDataService) {
  }

  SendLoginData(UserData: { email: string, password: string }) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.post(`${this.baseUrl}/account/login`, UserData, { headers: headers }).map(
      (response: Response) => {
        const data = response.json();
        this.UserDataService.setUserData(data);
        return data;
      }
    )
      .catch(
      (error: Response) => {
        return Observable.throw("لقد حدث خطأ ما .. من فضلك أعد المحاولة لاحقاً !!");
      }
      )
  }


}
