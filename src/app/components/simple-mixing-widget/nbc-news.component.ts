import { Component, Input } from '@angular/core';

import { News } from './model-news';

@Component({

    template: `
    <h3>NBC News</h3>
    <div style="text-align: center">
         <h4>{{news.title}}</h4>
        <img (click)="onNavigateTab(news.url)" src="{{news.urlToImage}}" style="height: 100%;width: 100%;cursor:pointer">
    </div>
  `
})
export class NbcNewsComponent implements News {
    @Input() news: any;
    onNavigateTab(url) {
        window.open(url, "_blank");
    }

}