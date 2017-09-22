import { PostService } from './post.service';
import { GetService } from './get.service';
import { Component ,OnInit} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit() {
  this.elasticsearch();
  this.register();
  }
  title = 'app';
  table:any;
  latency:any
  data:any;
  err = '';
  lat:any;
  arr1:any;
  arr2:any;
  final:any;  
  lat1(){
this.arr1=this.lat.split(":")[0];
this.arr2=this.lat.split(":")[1];
console.log(this.arr1);
console.log(this.arr2);
// this.arr1='{"'+this.arr1+'":"'+this.arr2+'"}';
// this.arr2='"'+this.arr2+'"';
this.final = '{' + this.arr1 + ':' + this.arr2 +'}';
console.log(this.arr1);

this.body ={
  "aggs": {
     "distinct_webDomain": {
        "cardinality": {
           "field": "sessionId.keyword"
        }
     }
  },
  "query": {
     "bool": {
        "must": {
           "term":{ 
            
        }
      }
     }
  }
};
this.body.query.bool.must.term[this.arr1] = this.arr2;

console.log(this.body);
this.postservice.postdata(this.body,'http://search-bungee-request-data-liwdos562m3h5js5zbcipwuvxe.us-east-1.es.amazonaws.com/bungee-es-records/_search?')
.subscribe(
data => {
this.data = data;
     console.log(data);
     this.totaldownload=(data.aggregations[1]);
     
}, //Bind to view
err => {
  this.err = JSON.parse(err._body);
  console.log(err);
});
  }
  constructor(private http: Http,private getservice:GetService,private postservice:PostService)
  {

  }    
  elasticsearch() {
    // Get all comments
    this.getservice.getdata('http://search-bungee-request-data-liwdos562m3h5js5zbcipwuvxe.us-east-1.es.amazonaws.com/bungee-es-records/_count?q=webDomain:ssl.gstatic.com')
      .subscribe( 
   data => {this.table = data;
        // console.log(data);
// console.log(data);
      }, //Bind to view
      err => {
        // Log errors if any
        console.log(err);
      });
  
     
  }



  body:any;
uniquepagesaccessed:any  
noipused:any
avglatency:any;
totaldownload:any
Failures:any
  register(){
      this.body = {
        "size" : 0,
        "aggs" : {
            "distinct_webDomain" : {
                "cardinality" : {
                  "field" : "sessionId.keyword"
                }
            }
        }
    };
    console.log(this.body);
    this.postservice.postdata(this.body,'http://search-bungee-request-data-liwdos562m3h5js5zbcipwuvxe.us-east-1.es.amazonaws.com/bungee-es-records/_search?')
    .subscribe(
 data => {
   this.data = data;
        //  console.log(data);
         this.uniquepagesaccessed=(data.aggregations.distinct_webDomain);
// console.log(this.uniquepagesaccessed);
    }, //Bind to view
    err => {
      this.err = JSON.parse(err._body);
      console.log(err);
    });
  
    this.body = {
      "size" : 0,
      "aggs" : {
          "distinct_noofipused" : {
              "cardinality" : {
                "field" : "ipUsed.keyword"
              }
          }
      }
  };
  this.postservice.postdata(this.body,'http://search-bungee-request-data-liwdos562m3h5js5zbcipwuvxe.us-east-1.es.amazonaws.com/bungee-es-records/_search?')
  .subscribe(
data => {
 this.data = data;
      //  console.log(data);
       this.noipused=(data.aggregations.distinct_noofipused);
       
  }, //Bind to view
  err => {
    this.err = JSON.parse(err._body);
    console.log(err);
  });

  
  this.body = {
  
    "query": {
      "bool": {
        "must": [
          {
            "match_all": {}
          },
          {
            "match_all": {}
          }
        ],
        "must_not": []
      }
    },
    "size": 0,
    "_source": {
      "excludes": []
    },
    "aggs": {
      "1": {
        "avg": {
          "field": "latency"
        }
      }
    }};
this.postservice.postdata(this.body,'http://search-bungee-request-data-liwdos562m3h5js5zbcipwuvxe.us-east-1.es.amazonaws.com/bungee-es-records/_search?')
.subscribe(
data => {
this.data = data;
    //  console.log(data);
     this.avglatency=(data.aggregations[1]);
     
}, //Bind to view
err => {
  this.err = JSON.parse(err._body);
  console.log(err);
});

this.body = {
  "size": 0,
  "aggs": {
    "1": {
      "sum": {
        "script": {
          "inline": "doc['responseSize'].value/(1024)",
          "lang": "painless"
        }
      }
    }
  }
  };
this.postservice.postdata(this.body,'http://search-bungee-request-data-liwdos562m3h5js5zbcipwuvxe.us-east-1.es.amazonaws.com/bungee-es-records/_search?')
.subscribe(
data => {
this.data = data;
    //  console.log(data);
     this.totaldownload=(data.aggregations[1]);
     
}, //Bind to view
err => {
  this.err = JSON.parse(err._body);
  console.log(err);
});
  

this.body = {
  "size": 0,
  "aggs": {},
  "version": true,
  "query": {
    "bool": {
      "must": [
        {
          "query_string": {
            "query": "!responseStatusCode:[200 TO 399]",
            "analyze_wildcard": true
          }
        },
        {
          "match_all": {}
        }
      ],
      "must_not": []
    }
  },
  "_source": {
    "excludes": []
  },
  "highlight": {
    "pre_tags": [
      "@kibana-highlighted-field@"
    ],
    "post_tags": [
      "@/kibana-highlighted-field@"
    ],
    "fields": {
      "*": {
        "highlight_query": {
          "bool": {
            "must": [
              {
                "query_string": {
                  "query": "!responseStatusCode:[200 TO 399]",
                  "analyze_wildcard": true,
                  "all_fields": true
                }
              },
              {
                // "match_all": {}
              }
            ],
       
          }
        }
      }
    },
  
  }
};
this.postservice.postdata(this.body,'http://search-bungee-request-data-liwdos562m3h5js5zbcipwuvxe.us-east-1.es.amazonaws.com/bungee-es-records/_search?')
.subscribe(
data => {
this.data = data;
    //  console.log(data.hits.total);
    this.Failures=(data.hits.total);
     
}, //Bind to view
err => {
  this.err = JSON.parse(err._body);
  console.log(err);
});
   }
}

  

