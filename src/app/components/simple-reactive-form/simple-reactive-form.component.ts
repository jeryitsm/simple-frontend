import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-simple-reactive-form',
  templateUrl: './simple-reactive-form.component.html',
  styleUrls: ['./simple-reactive-form.component.css']
})
export class SimpleReactiveFormComponent implements OnInit {
  productForm: FormGroup;  
  constructor(private fbuilder: FormBuilder) { }

  ngOnInit() {
  }
  createForm() {
    this.productForm = this.fbuilder.group({
      product_code: String,
      product_name: String,
      product_group: String,
      product_detail: String,
      product_price: Number,
      product_qty: Number,
    });
  }    
}
