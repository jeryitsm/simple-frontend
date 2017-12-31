import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private translate: TranslateService) {

  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit() {
    this.translate.setDefaultLang('en');
  }

}
