import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

  serviceURL = 'http://localhost:3000/api/todolists';
  headers = new Headers({
    "Content-Type": "application/json"
  });
  options = new RequestOptions({
    headers: this.headers
  });
  constructor(public http: Http, private httpClient: HttpClient) {
    // this.testnew();
  }
  testnew() {
    this.httpClient.get(this.serviceURL).subscribe(data => {
      console.log(data);
    }), (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("client error ");
      } else {
        console.log("cerver error ");
      }
    }
    // this.httpClient.get<ItemsResponse>(this.serviceURL)
    //   .retry(3)
    //   .subscribe((data => {
    //     console.log(data)
    //   }));
  }
  createProduct(requestJSON): Promise<any> {
    var response = this.http.post(this.serviceURL, requestJSON, this.options)
    return response.map(res => <any>res.json()).toPromise()
  }
  getProductAll(): Promise<any> {
    var response = this.http.get(this.serviceURL, this.options)
    return response.map(res => <any>res.json()).toPromise()
  }
  getProductById(requestJSON) {
    var response = this.http.post(this.serviceURL, requestJSON, this.options)
    return response.map(res => <any>res.json()).toPromise()

  }
  removeProduct(requestJSON): Promise<any> {
    var response = this.http.delete(this.serviceURL, new RequestOptions({
      headers: this.headers,
      body: requestJSON
    }))
    return response.map(res => <any>res.json()).toPromise()
  }
  updateProduct(requestJSON) {
    var response = this.http.put(this.serviceURL, requestJSON, this.options)
    return response.map(res => <any>res.json()).toPromise()
  }
}
