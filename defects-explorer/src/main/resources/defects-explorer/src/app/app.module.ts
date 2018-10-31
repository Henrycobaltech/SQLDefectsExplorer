import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppRootComponent } from './components/app-root/app-root.component';
import { materialModules } from './material.imports';
import { PullRequestListItemComponent } from './components/pull-request-list-item/pull-request-list-item.component';
import { PullRequestsService } from './services/pullrequests.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppRootComponent,
    PullRequestListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...materialModules
  ],
  providers: [
    PullRequestsService
  ],
  bootstrap: [AppRootComponent]
})
export class AppModule { }
