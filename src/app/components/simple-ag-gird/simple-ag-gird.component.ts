import { Component, OnInit } from '@angular/core';
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
  product_lastUpdate: String,
}

@Component({
  selector: 'app-simple-ag-gird',
  templateUrl: './simple-ag-gird.component.html',
  styleUrls: ['./simple-ag-gird.component.css']
})
export class SimpleAgGirdComponent implements OnInit {
  style = {
    marginTop: '10px',
    width: '100%',
    height: '400px',
    boxSizing: 'border-box'
  };
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private rowSelection;
  agGrid;
  results: Object;
  selectedProduct = "select";
  serviceURL = "http://localhost:3000/api/todolists";
  rowData: any;
  valuesFilter: String;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.columnDefs = [
      {
        headerName: "#",
        width: 50,
        cellRenderer: function (params) {
          return "" + params.rowIndex;
        }
      },
      { headerName: "Product Code", field: "product_code", width: 150 },
      { headerName: "Product Name", field: "product_name", width: 150 },
      { headerName: "Product Group", field: "product_group", width: 150 },
      { headerName: "Product Detail", field: "product_detail", width: 250 },
      { headerName: "Product Price", field: "product_price", width: 150 },
      { headerName: "Product QTY", field: "product_qty", width: 150 },
      { headerName: "Product Last Update", field: "product_lastUpdate", width: 200 }
    ];
    this.rowSelection = "single"
  }

  setWidthAndHeight(width, height) {
    this.style = {
      marginTop: '10px',
      width: width,
      height: height,
      boxSizing: 'border-box'
    };

    this.agGrid.api.doLayout()
  }

  onQuickFilterChanged(event: any) {
    this.gridApi.setQuickFilter(event.target.value);
    this.valuesFilter = event.target.value
  }

  clearFilter() {
    this.gridApi.setQuickFilter('')
    this.gridApi.setFilterModel(null)
  }

  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows()
    var selectedRowsString = ""
    selectedRows.forEach(function (selectedRow, index) {
      // console.log(selectedRow)
      if (index !== 0) {
        selectedRowsString += ", "
      }
      selectedRowsString += selectedRow.product_code + ' ' + selectedRow.product_name + ' ' + selectedRow.product_price
    });
    this.selectedProduct = selectedRowsString
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi

    this.http
      .get(this.serviceURL)
      .retry(3)
      .subscribe(data => {
        // console.log(data)
        params.api.setRowData(data)
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
