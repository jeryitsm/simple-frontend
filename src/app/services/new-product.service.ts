import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NewProductService {
  serviceURL = "http://localhost:3000/api/todolists";

  constructor(private http: HttpClient) { }

  getProduct() {
    this.http
      .get(this.serviceURL)
      .retry(3)
      .subscribe(data => {
        // console.log(data)
      }, (err: HttpErrorResponse) => {
        // error
        if (err.error instanceof Error) {
          // client error
          console.log('An error occurred:', err.error.message);
        } else { // server error 
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`)
        }
      })
  }
}
