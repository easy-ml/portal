import { Component, OnInit, ApplicationInitStatus } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { App } from 'src/app/shared/app.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.styl']
})
export class ViewComponent implements OnInit {
  public applications = new Array<App>();
  public loaded = false;
  constructor(private storeService: StoreService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.storeService.getApps().subscribe(apps => {
      this.applications.push(...apps.items);
      this.loaded = true
    });
  }

  signOut() {
    this.authService.signOut()
    this.router.navigate(['/sign-in']);
  }

}
