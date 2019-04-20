import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.styl']
})
export class SignInComponent implements OnInit {
  private redirectUrl: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.redirectUrl = params.next || '/store');
  }

  signIn() {
    const success = true;
    if (success) {
      this.router.navigateByUrl(this.redirectUrl);
    }
  }

}
