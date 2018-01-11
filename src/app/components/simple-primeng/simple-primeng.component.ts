import { Component, OnInit } from '@angular/core';
import { ButtonModule, DataScrollerModule, CalendarModule, DataListModule, Header, Footer, DialogModule } from 'primeng/primeng';
import { Message } from 'primeng/components/common/message';

import { Car } from './car'; import { HttpClient, HttpErrorResponse } from '@angular/common/http';
;
@Component({
  selector: 'app-simple-primeng',
  templateUrl: './simple-primeng.component.html',
  styleUrls: ['./simple-primeng.component.css']
})
export class SimplePrimengComponent implements OnInit {
  serviceURL = "http://localhost:3000/api/todolists";
  product: any
  msgs: Message[];
  constructor(private http: HttpClient) {

  }
  ngOnInit() {
  }
  loadData(event) {
    //initialize
    if (!this.product) {
      this.http
        .get(this.serviceURL)
        .retry(3)
        .subscribe(data => {
          // console.log(data)
          this.product = data
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
    //in real application, newArray should be loaded from a remote datasource
    else {
      let newArray = this.product.slice(0);
      for (let i = 0; i < newArray.length; i++) {
        this.product.push(newArray[i]);
      }
      this.msgs = [];
      this.msgs.push({ severity: 'info', summary: 'Data Loaded', detail: 'Between ' + event.first + ' and ' + (event.first + event.rows) });
    }
  }

}
