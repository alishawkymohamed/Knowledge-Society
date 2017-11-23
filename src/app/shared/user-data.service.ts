import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class UserDataService {
  private user = null;

  constructor() {
  }
  public setUserData(user: any) {
    this.user = user;
  }
  public getUserData() {
    return this.user;
  }
}
