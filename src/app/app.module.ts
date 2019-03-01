import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatIconModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,MatCardModule,MatIconModule,MatInputModule,FormsModule,
    AppRoutingModule
  ], exports: [HttpClientModule],
  providers: [ HttpClient,HttpClientModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
