import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BbbNewsComponent } from './bbc-news.component';
import { NbcNewsComponent } from './nbc-news.component';
import { NewsData } from './news-data';

@Injectable()
export class NewsService {
  nbcApiURL: string = 'https://newsapi.org/v2/top-headlines?sources=nbc-news&apiKey=4829f217dfac4bba8fb9eaa75a3fbb9f'
  bbcApiURL: string = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=4829f217dfac4bba8fb9eaa75a3fbb9f'
  dataBBC: any
  dataNBC: any
  
  constructor(private http: HttpClient, ) {
    //fixed news
    this.http.get(this.bbcApiURL).retry(3).subscribe(data => {// console.log(data)
      this.dataBBC = data
    })
    this.http.get(this.nbcApiURL).retry(3).subscribe(data => { //console.log(data)
      this.dataNBC = data
    })
  }
  getNews() { // fixed news
    console.log('getNews fixed')
    return [
      new NewsData(BbbNewsComponent, {
        author: "BBC News", description: "The contrasting reactions to the president's speech tell the tale of a deeply divided Congress."
        , publishedAt: "2018-01-31T06:24:17Z"
        , source: { id: "bbc-news", name: "BBC News" }
        , title: "Standing ovation v stony-faced silence"
        , url: "http://www.bbc.co.uk/news/world-us-canada-42867971"
        , urlToImage: "https://ichef.bbci.co.uk/news/1024/branded_news/10933/production/_99819876_p05wmsy5.jpg"
      }),

      new NewsData(BbbNewsComponent, {
        author: "BBC News", description: "The president used high-minded language as he called for unity - but the same hard edge lay beneath."
        , publishedAt: "2018-01-31T04:06:09Z"
        , source: { id: "bbc-news", name: "BBC News" }
        , title: "A smoother Trump with same hard edge"
        , url: "http://www.bbc.co.uk/news/world-us-canada-42867965"
        , urlToImage: "https://ichef-1.bbci.co.uk/news/1024/branded_news/3A2B/production/_99819841_hi044442718.jpg"
      }),

      new NewsData(NbcNewsComponent, {
        author: "Alex Johnson", description: "The adult film star said on 'Jimmy Kimmel Live' that she didn't know where a denial of an affair with Donald Trump came from earlier Tuesday."
        , publishedAt: "2018-01-31T05:54:59Z"
        , source: { id: "nbc-news", name: "NBC News" }
        , title: "Stormy Daniels appears to deny denial of Trump affair"
        , url: "http://www.nbcnews.com/news/us-news/stormy-daniels-appears-deny-denial-trump-affair-n843131"
        , urlToImage: "https://media3.s-nbcnews.com/j/newscms/2018_03/2295566/180117-stormy-daniels-ew-1244p_356770550107cd0c10ca94aff91298bf.nbcnews-fp-1200-630.jpg"
      }),

      new NewsData(NbcNewsComponent, {
        author: "Kurt Bardella", description: "Andrew McCabe's fishy resignation after Trump threats exposes the GOP-lead House Oversight Committee cowardice"
        , publishedAt: "2018-01-31T05:52:51.3236591Z"
        , source: { id: "nbc-news", name: "NBC News" }
        , title: "Andrew McCabe's fishy resignation exposes House Oversight Committee cowardice"
        , url: "http://www.nbcnews.com/think/opinion/andrew-mccabe-s-fishy-resignation-exposes-house-oversight-committee-cowardice-ncna842776"
        , urlToImage: "https://media3.s-nbcnews.com/j/newscms/2018_05/2310411/180130-andrew-mccabe-se-303p_3e9e2318221f39965d526bfc794c139b.1200;630;7;70;5.jpg"
      })];
  }
}
