import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { ViewComponent } from './view/view.component';
import { AuthGuard } from '../guards/auth.guard';
import { AppComponent } from './app/app.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ViewComponent,
    AppComponent,
    MenuComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    StoreRoutingModule
  ],
  providers: [
    AuthGuard
  ]
})
export class StoreModule { }
