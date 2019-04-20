import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StoreModule } from './store/store.module';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    StoreModule,
    ReactiveFormsModule,
    AppRoutingModule // should be last one
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
