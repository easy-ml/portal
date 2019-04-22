import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { AuthGuard } from '../guards/auth.guard';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  {
    path: 'store/:id',
    component: AppComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'store',
    component: ViewComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
