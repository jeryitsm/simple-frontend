import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NewProductService {
  serviceURL = "http://localhost:3000/api/todolists";

  constructor(private http: HttpClient) { }

  // get():Observable<any>{
  //   return this.http.get(url:"http://localhost:3000/api/todolists",options:{
  //   observe: "body",
  //   responseType: "json"
  //   })
  // }
}
