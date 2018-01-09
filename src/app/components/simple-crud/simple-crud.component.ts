import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';


@Component({
  selector: 'app-simple-crud',
  templateUrl: './simple-crud.component.html',
  styleUrls: ['./simple-crud.component.css']
})
export class SimpleCrudComponent implements OnInit {
  options: GridsterConfig;
  public modalRef: BsModalRef;
  badgeProduct = 0
  nameOnCard = ''
  saveSuccess = true
  tmpCart_total = 0
  tmpCart = []
  productlist: any
  tmpProductTest = {
    product_code: String,
    product_name: String,
    product_img: Array,
    product_group: String,
    product_detail: String,
    product_price: Number,
    product_qty: Number
  }
  tmpProduct = this.tmpProductTest;
  title = 'app'
  code: String
  name: String
  detail: String
  group: String
  qty: number
  price: number
  constructor(private productService: ProductService, private modalService: BsModalService) {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template)
  }
  static itemChange(item, itemComponent) {
    // console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    // console.info('itemResized', item, itemComponent);
  }

  ngOnInit() {
    // this.productService.testnew();
    this.reProduct()
    this.options = {
      itemChangeCallback: SimpleCrudComponent.itemChange,
      itemResizeCallback: SimpleCrudComponent.itemResize,
    };
  }

  reProduct() {
    let result = this.productService.getProductAll()
    result.then(data => {
      if (data !== undefined) {
        // for get data
        this.productlist = data;
        // this.tmpProduct = data[0]; 
        // console.log(this.productlist);
      } else {

      }
    })
  }


  productCreate(code, name, detail, group, qty, price) {
    console.log(code, name, detail, group, qty, price)
    if (code && name) {

      let req = {
        product_code: code,
        product_name: name,
        product_qty: qty,
        product_price: price,
        product_detail: detail,
        product_img: "assets/img/" + this.getRandomInt(1, 12) + ".jpg",
        product_group: group,
      }
      let result = this.productService.createProduct(req)
      result.then(data => {
        if (data !== undefined && data._id) {
          this.reProduct();
        } else {
          alert("Failed to add")
        }
      })
    } else {
      alert("Failed to add");
    }

  }


  productUpdate(req, type) {
    // console.log(req)
    let result = this.productService.updateProduct(req)
    result.then(data => {
      if (data !== undefined && data.status) {
        alert('update success')
        this.reProduct();
      } else {
        alert("Failed")
      }
    })
  }


  productRemove(id) {
    let req = {
      _id: id
    }
    let result = this.productService.removeProduct(req)
    result.then(data => {
      if (data !== undefined) {
        // console.log(data);
        if (data.status) {
          let index = this.productlist.indexOf(id)
          if (index > -1) {
            this.productlist.splice(index, 1)
          }
        } else {
          alert("Deletion failed")
        }

      } else {

      }
    })
  }


  productGetById(id, type) {
    if (id) {
      let req = {
        _id: id
      }
      let result = this.productService.getProductById(req)
      result.then(data => {
        if (data !== undefined) {
          this.tmpProduct = data
          // console.log(this.tmpProduct);
          if (type == 'edit') {
            // this.modalRef = this.modalService.show('editproduct');
          } else if (type == 'view') {
          }

        } else {

        }
      })
    } else {
      alert("Failed")
    }
  }


  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  removeCart(product) {
    // console.log('rrr',id);
    let index = this.tmpCart.indexOf(product);
    if (index > -1) {
      this.tmpCart.splice(index, 1);
      this.tmpCart_total -= (product.product_price * product.qty);
      this.badgeProduct--;
    }
  }


  addtocart(product) {
    if (product) {
      // this.sendAnAutoDismissingAlert();
      let checkitem = true
      for (let i in this.tmpCart) {
        if (this.tmpCart[i]._id == product._id) {
          if (this.tmpCart[i].qty < this.tmpCart[i].product_qty) {
            this.tmpCart[i].qty++;
            this.tmpCart_total += this.tmpCart[i].product_price
            alert("Add to Cart Success!!")
          } else {
            alert("Cannot add any more")
          }
          checkitem = false
        }
      }
      if (checkitem) {
        product.qty = 1
        this.tmpCart.push(product);
        this.badgeProduct++
        this.tmpCart_total += product.product_price;
        alert("Add to Cart Success!!")
      }
      // console.log(this.tmpCart);
    }
  }


  filterItem(value) {
    if (!value) this.reProduct(); //when nothing has typed
    let tmpProducts = this.productlist
    this.productlist = Object.assign([], tmpProducts).filter(
      item => item.product_name.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }


  closeCart() {
  }


  payment() {
    if (this.tmpCart) {
      for (let i in this.tmpCart) {
        let req = {
          _id: this.tmpCart[i]._id,
          product_qty: this.tmpCart[i].product_qty - this.tmpCart[i].qty
        }
        this.productService.updateProduct(req)
        this.reProduct()
        alert("Payment simulator and stock removal.Successfully!")

      }
      this.tmpCart = [];
      this.badgeProduct = 0
      this.tmpCart_total = 0
    } else {
      alert("Incomplete information")
    }
  }

}
