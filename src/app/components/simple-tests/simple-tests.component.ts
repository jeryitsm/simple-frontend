import { Component, OnInit } from '@angular/core';
import { NewProductService } from '../../services/new-product.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/retry';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../../services/authentication.service';

import { SidebarModule ,ButtonModule} from 'primeng/primeng';

interface Product {
  _id: String,
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
  visibleSidebar2;
  serviceURL = "http://localhost:3000/api/todolists";
  items: Observable<any[]>;

  public results: any;

  constructor(public authService: AuthenticationService, private http: HttpClient, private dbFirebase: AngularFirestore) { }

  ngOnInit() {
    // this.getProduct();
  }

  getFirebaseTest() {
    this.items = this.dbFirebase.collection('items').valueChanges();
  }

  email: string;
  password: string;
  semail: string;
  spassword: string;

  signup() {
    this.authService.signup(this.semail, this.spassword);
    this.semail = this.spassword = '';
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }
  
  getProduct() {
    this.http.get(this.serviceURL).retry(3).subscribe(data => {
      // JSON response 
      this.results = data;
    }, (err: HttpErrorResponse) => {
      // error
      if (err.error instanceof Error) {
        // client error
        console.log('An error occurred:', err.error.message);
      } else { // server error 
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
    });
  }
}
