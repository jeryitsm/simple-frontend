//mixing between ag-grid, gridster, primeng and dynamic-component-loader 
import { Component, OnInit} from '@angular/core';
// import { MenuItem } from 'primeng/primeng';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';

import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { NewsService }         from './news.service';
import { NewsData }            from './news-data';

@Component({
  selector: 'app-simple-mixing-widget',
  templateUrl: './simple-mixing-widget.component.html',
  styleUrls: ['./simple-mixing-widget.component.css'],
  providers: [MessageService]
})

export class SimpleMixingWidgetComponent implements OnInit {
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  items: any;

  msgs: Message[] = [];

  //--ag-gird------------------------------------------------
  styleAgGird = {   // setup style Ag-Gird
    marginTop: '0px',
    width: '100%',
    height: '360px',
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
  //----------------------------------------------------------
  innerHeight: any;
  innerWidth: any;
  //--new--------------------------------------------------------
  news: NewsData[];

  constructor(private newsService: NewsService,private http: HttpClient,private messageService: MessageService) { }

  ngOnInit() {
    this.agGirdOnInit()
    this.primengOnInit()
    this.gridsterOnInit()
    this.innerHeight = (window.screen.height); // get height
    this.innerWidth = (window.screen.width);
  }

  gridsterOnInit() {
    this.options = {
      itemChangeCallback: SimpleMixingWidgetComponent.itemChange,
      itemResizeCallback: SimpleMixingWidgetComponent.itemResize,
      gridType: 'scrollVertical',
      mobileBreakpoint: 640,
      compactUp: false,
      compactLeft: false,
      margin: 1,
      outerMargin: true,
      maxItemCols: 6,
      minItemCols: 1,
      maxItemRows: 50,
      minItemRows: 1,
      defaultItemCols: 2,
      defaultItemRows: 1,
      fixedColWidth: 100,
      fixedRowHeight: 100,
      swap: true,
      draggable: {
        delayStart: 0, // milliseconds to delay the start of resize, useful for touch interaction
        enabled: true, // enable/disable draggable items
        ignoreContentClass: 'gridster-item-content', // default content class to ignore the drag event from
        ignoreContent: false, // if true drag will start only from elements from `dragHandleClass`
        dragHandleClass: 'drag-handler', // drag event only from this class. If `ignoreContent` is true.
        stop: undefined, // callback when dragging an item stops.  Accepts Promise return to cancel/approve drag.
        start: undefined // callback when dragging an item starts.
        // Arguments: item, gridsterItem, event
      },
      resizable: {
        delayStart: 0, // milliseconds to delay the start of resize, useful for touch interaction
        enabled: true, // enable/disable resizable items
        handles: {
          s: true,
          e: true,
          n: true,
          w: true,
          se: true,
          ne: true,
          sw: true,
          nw: true
        }, // resizable edges of an item
        stop: undefined, // callback when resizing an item stops. Accepts Promise return to cancel/approve resize.
        start: undefined // callback when resizing an item starts.
      },
    };
    this.dashboard = [
      { rows: 2, cols: 3, x: 0, y: 0, minItemRows: 2, minItemCols: 3, propName: "ag-grid" },
      { rows: 1, cols: 3, x: 3, y: 0, propName: "Announcement" },
      { rows: 2, cols: 3, x: 3, y: 1, propName: "News" },
      // {  rows: 3,cols: 3, x: 3, y: 3 },
      //   {cols: undefined, rows: undefined, y: 1, x: 0},
      //   {cols: 1, rows: 1, y: undefined, x: undefined},
      //   {cols: 2, rows: 2, y: 1, x: 5, minItemRows: 2, minItemCols: 2, label: 'Min rows & cols = 2'},
      //   {cols: 2, rows: 2, y: 2, x: 0, maxItemRows: 2, maxItemCols: 2, label: 'Max rows & cols = 2'},
      //   {cols: 2, rows: 1, y: 2, x: 2, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled'},
      //   {cols: 1, rows: 1, y: 2, x: 4, dragEnabled: false, resizeEnabled: false, label: 'Drag&Resize Disabled'},
    ];
    this.news = this.newsService.getNews();
  }

  // gridster function
  static itemChange(item, itemComponent) {
    // console.info('itemChanged', item, itemComponent)
  }

  static itemResize(item, itemComponent) {
    // console.info('itemResized', item, itemComponent);
  }

  changedOptions() {
    this.options.api.optionsChanged();
    console.log(this.options.api.optionsChanged())
  }

  changedOptionsGridsterConfiggridType(value) {
  }

  removeItem(item) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(obj: object) {
    this.dashboard.push(obj);
  }
  // end gridster function

  showViaService(severity, summary, detail) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }

  clearViaService() {
    this.messageService.clear();
  }

  showSuccess(msg: string) {
    this.showViaService('success', 'Success', msg)
  }

  primengOnInit() {
    //primeng setup
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
        this.showViaService('success', 'Success', 'Load Complete')
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

  agGirdOnInit() {
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
      { headerName: "Product Detail", field: "product_detail", width: 150 },
      { headerName: "Product Price", field: "product_price", width: 150 },
      { headerName: "Product QTY", field: "product_qty", width: 150 },
      { headerName: "Product Last Update", field: "product_lastUpdate", width: 150 }
    ];
    this.rowSelection = "single"
  }

  setWidthAndHeight(width, height) {
    this.styleAgGird = {
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

  // select row product
  onSelectionChanged() {
    this.showViaService('info', 'Selected', '')
    let selectedRows = this.gridApi.getSelectedRows()
    let selectedRowsString = ""
    selectedRows[0].rows = 2 // default
    selectedRows[0].cols = 2 // default 
    selectedRows[0].propName = 'product' //set propName to 
    selectedRows[0].minItemRows = 2
    this.addItem(selectedRows[0])

    selectedRows.forEach(function (selectedRow, index) {
      // console.log(selectedRow)
      if (index !== 0) {
        selectedRowsString += ", "
      }
      selectedRowsString += selectedRow.product_code + ' ' + selectedRow.product_name + ' ' + selectedRow.product_price
    });
    this.selectedProduct = selectedRowsString
  }
}
