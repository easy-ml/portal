import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'store',
    component: ViewComponent,
    // children: [
    //   { path: '', redirectTo: 'home', pathMatch: 'full' },
    //   { path: 'home', component: HomeComponent},
    //   { path: 'admin', component: AdminComponent}
    // ]
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
