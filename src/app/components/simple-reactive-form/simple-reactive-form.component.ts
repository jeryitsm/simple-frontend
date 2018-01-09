import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface Product {
  _id: String,
  product_code: String,
  product_name: String,
  product_img: any,
  product_group: String,
  product_detail: String,
  product_price: Number,
  product_qty: Number,
}

@Component({
  selector: 'app-simple-reactive-form',
  templateUrl: './simple-reactive-form.component.html',
  styleUrls: ['./simple-reactive-form.component.css']
})


export class SimpleReactiveFormComponent implements OnInit {
  serviceURL = "http://localhost:3000/api/todolists";
  products: any
  isLoading = false
  selectedProduct: Product
  _id:String

  productForm: FormGroup
  product: Product

  nameChangeLog: string[] = [];
  logNameChange() {
    const nameControl = this.productForm.get('product_name');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }

  constructor(private fbuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.createForm()
    this.getProduct()
  }

  getProduct() {
    this.isLoading = true
    this.http
      .get(this.serviceURL)
      .retry(3)
      .subscribe(data => {
        // console.log(data)
        this.products = data
        this.isLoading = false
      }, (err: HttpErrorResponse) => {
        // error
        if (err.error instanceof Error) {
          // client error
          console.log('An error occurred:', err.error.message);
        } else { // server error 
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`)
        }
      })
    this.selectedProduct = undefined;
  }

  select(pro) {
    this.selectedProduct = pro
    this.productForm.reset({
      product_code: pro.product_code,
      product_name: pro.product_name,
      product_group: pro.product_group,
      product_detail: pro.product_detail,
      product_price: pro.product_price,
      product_qty: pro.product_qty,
    });
  }

  createForm() {
    this.productForm = this.fbuilder.group({
      product_code: ['', Validators.required],
      product_name: ['', Validators.required],
      product_group: '',
      product_detail: '',
      product_price: 0,
      product_qty: 0,
    });
  }

  ngOnChanges(product: Product) {
    this.productForm.reset({
      product_code: this.product.product_code,
      product_name: this.product.product_name,
      product_group: this.product.product_group,
      product_detail: this.product.product_detail,
      product_price: this.product.product_price,
      product_qty: this.product.product_qty,
    });
  }

  prepareSaveProduct(): Product {
    const formModel = this.productForm.value;

    const saveProduct: Product = {
      _id: this._id as string,
      product_code: formModel.product_code as string,
      product_name: formModel.product_name as string,
      product_group: formModel.product_group as string,
      product_detail: formModel.product_detail as string,
      product_price: formModel.product_price as number,
      product_qty: formModel.product_qty as number,
      product_img: "assets/img/" + this.getRandomInt(1, 12) + ".jpg"
    };
    return saveProduct;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onSubmit() {
    this.product = this.prepareSaveProduct();
    console.log(this.product);
    // คำสั่งที่จะเอาค่า this.staff ไปใช้งาน
    this.ngOnChanges(this.product);
  }

  revert() { this.ngOnChanges(null); }

}
