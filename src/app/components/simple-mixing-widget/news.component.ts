import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { SimpleMixingWidgetDirective } from './simple-mixing-widget.directive';
import { News }      from './model-news';
import { NewsData } from './news-data';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements AfterViewInit, OnDestroy {
  @Input() news: NewsData[];
  currentAddIndex: number = -1;
  @ViewChild(SimpleMixingWidgetDirective) newsHost: SimpleMixingWidgetDirective;
  subscription: any;
  interval: any;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit() {
    this.loadComponent();
    this.getNews();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAddIndex = (this.currentAddIndex + 1) % this.news.length;
    let newsItem = this.news[this.currentAddIndex];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(newsItem.component);

    let viewContainerRef = this.newsHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<News>componentRef.instance).news = newsItem.news;
  }

  getNews() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 4000);
  }

}
