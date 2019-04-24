import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.styl']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit() {
  }

  navigateToMain() {
    this.router.navigate(['/']);
  }

  signOut() {
    this.authService.signOut()
    this.router.navigate(['/sign-in']);
  }
}
