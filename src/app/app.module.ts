import { Http,HttpModule } from '@angular/http';
import { GetService } from './get.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {PostService} from './post.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [HttpModule,
    BrowserModule
  ],
  providers: [GetService,PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
