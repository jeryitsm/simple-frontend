import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  serviceURL = 'http://localhost:3000/api/user';
  headers = new Headers({
    "Content-Type": "application/json"
  });
  options = new RequestOptions({
    headers: this.headers
  });
  constructor(public http: Http) {
  }
  createUser(requestJSON): Promise<any> {
    var response = this.http.post(this.serviceURL, requestJSON, this.options)
    return response.map(res => <any>res.json()).toPromise()
  }
  getUserAll(): Promise<any> {
    var response = this.http.get(this.serviceURL, this.options)
    return response.map(res => <any>res.json()).toPromise()
  }
  getUserById(requestJSON) {
    var response = this.http.post(this.serviceURL, requestJSON, this.options)
    return response.map(res => <any>res.json()).toPromise()

  }
  removeUser(requestJSON): Promise<any> {
    var response = this.http.delete(this.serviceURL, new RequestOptions({
      headers: this.headers,
      body: requestJSON
   }))
    return response.map(res => <any>res.json()).toPromise()
  }
  updateUser(requestJSON) {
    var response = this.http.put(this.serviceURL, requestJSON, this.options)
    return response.map(res => <any>res.json()).toPromise()
  }
}
