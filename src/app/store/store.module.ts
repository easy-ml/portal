import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { ViewComponent } from './view/view.component';
import { AuthGuard } from '../guards/auth.guard';

@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule
  ],
  providers: [
    AuthGuard
  ]
})
export class StoreModule { }
