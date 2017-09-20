import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GetService {

  constructor(private http: Http) { }
  private dataUrl = 'https://search-bungee-request-data-liwdos562m3h5js5zbcipwuvxe.us-east-1.es.amazonaws.com/bungee-es-records/_search?size=*:*&q=*:*';
  getdata(url): Observable<any> {
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
