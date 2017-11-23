import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Response } from '@angular/http';

@Injectable()
export class ApiService {
  baseURL: string = 'http://localhost:2641';
  constructor(private http: Http, ) { }
  ServerRequest(URL: string, Method: string, Data: any) {
    const headers = new Headers({ 'Content-type': 'application/json' });
    switch (Method) {
      case 'POST':
        return this.http.post(this.baseURL + URL, Data, { headers: headers }).map((response: Response) => {
          return response.json();
        });
      case 'post':
        return this.http.post(this.baseURL + URL, Data, { headers: headers }).map((response: Response) => {
          return response.json();
        });
      case 'GET':
        return this.http.get(this.baseURL + URL, { headers: headers }).map((respanse: Response) => {
          return respanse.json();
        });
      case 'get':
        return this.http.get(this.baseURL + URL, { headers: headers }).map((response: Response) => {
          return response.json();
        });
      case 'PUT':
        return this.http.put(this.baseURL + URL, Data, { headers: headers }).map((response: Response) => {
          return response.json();
        });
      case 'put':
        return this.http.put(this.baseURL + URL, Data, { headers: headers }).map((response: Response) => {
          return response.json();
        });
      case 'DELETE':
        return this.http.delete(this.baseURL + URL, { headers: headers }).map((response: Response) => {
          return response.json();
        });
      case 'delete':
        return this.http.delete(this.baseURL + URL, { headers: headers }).map((response: Response) => {
          return response.json();
        });
      default:
        break;
    }
  }
}
