import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { UserDataService } from './user-data.service';
import { Observable } from 'rxjs';

@Injectable()
export class RegisterService {

  private baseUrl = "http://localhost:2641";

  constructor(private _http: Http, private UserDataService: UserDataService) {
  }

  SendRegisterData(PersonalDataSent: { TabName: string, PersonalData: any }) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.post(`${this.baseUrl}/Register/Save`, PersonalDataSent, { headers: headers }).map(
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
