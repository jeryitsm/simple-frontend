import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { SimpleCrudComponent } from './components/simple-crud/simple-crud.component';


import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { NavbarComponent } from './components/navbar/navbar.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router/src/router';
import { GridsterModule } from 'angular-gridster2';

const routes: Routes = [
  { path: 'user', component:  UserComponent },
  { path: '', component:  SimpleCrudComponent }
  
];
@NgModule({
  declarations: [
    AppComponent,
    SimpleCrudComponent,
    UserComponent,
    NavbarComponent
  ],
  imports: [
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
    })
  ],
  providers: [ProductService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
