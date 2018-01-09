import { Component, OnInit } from '@angular/core';
import { NewProductService } from '../../services/new-product.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/retry';

interface Product{
  _id : String,
  product_code: String,
  product_name: String,
  product_img: any,
  product_group: String,
  product_detail: String,
  product_price: Number,
  product_qty: Number
}

@Component({
  selector: 'app-simple-tests',
  templateUrl: './simple-tests.component.html',
  styleUrls: ['./simple-tests.component.css']
})
export class SimpleTestsComponent implements OnInit {

  serviceURL = "http://localhost:3000/api/todolists";

  public results:any;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get(this.serviceURL).retry(3).subscribe(data => {
      // JSON response 
      this.results = data;
    },( err:HttpErrorResponse ) => {
      // error
      if (err.error instanceof Error) {
        // client error
        console.log('An error occurred:', err.error.message);
      }else{ // server error 
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }       
    }); 
  }

}
