import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { SimpleCrudComponent } from './components/simple-crud/simple-crud.component';


import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { NewProductService } from './services/new-product.service';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { NavbarComponent } from './components/navbar/navbar.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router/src/router';
import { GridsterModule } from 'angular-gridster2';
import { SimpleAgGirdComponent } from './components/simple-ag-gird/simple-ag-gird.component';

import { AgGridModule } from 'ag-grid-angular/main';
import { AccordionModule } from 'primeng/components/accordion/accordion';
import { MenuItem } from 'primeng/components/common/api';

import { ProductInterceptor } from './services/product-interceptor';
import { SimpleTestsComponent } from './components/simple-tests/simple-tests.component';
import { SimplePrimengComponent } from './components/simple-primeng/simple-primeng.component';
import { SimpleReactiveFormComponent } from './components/simple-reactive-form/simple-reactive-form.component';

const routes: Routes = [
  { path: 'app-simple-reactive-form', component: SimpleReactiveFormComponent },
  { path: 'app-simple-primeng', component: SimplePrimengComponent },
  { path: 'app-simple-tests', component: SimpleTestsComponent },
  { path: 'app-simple-ag-gird', component: SimpleAgGirdComponent },
  { path: 'user', component: UserComponent },
  { path: '', component: SimpleCrudComponent }

];
@NgModule({
  declarations: [
    AppComponent,
    SimpleCrudComponent,
    UserComponent,
    NavbarComponent,
    SimpleAgGirdComponent,
    SimpleTestsComponent,
    SimplePrimengComponent,
    SimpleReactiveFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AccordionModule,
    GridsterModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    HttpModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, './assets/i18n', '.json'),
      deps: [Http]
    }),
    AgGridModule.withComponents([SimpleAgGirdComponent]),
  ],
  providers: [NewProductService, ProductService, UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ProductInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
