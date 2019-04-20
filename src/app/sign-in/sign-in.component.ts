import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Token } from '../shared/token.model';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.styl']
})
export class SignInComponent implements OnInit {
  private redirectUrl: string;
  private signInForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  private errorMessage: string = null;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.redirectUrl = params.next || '/store');
  }

  signIn() {
    const signIn = this.signInForm.value;
    if (signIn.username && signIn.password) {
      this.authService.signIn(signIn.username, signIn.password)
        .subscribe(() => {
           this.router.navigateByUrl(this.redirectUrl);
        }, error => {
            this.errorMessage = error;
        });
    }
    // const success = true;
    // if (success) {
    //   this.router.navigateByUrl(this.redirectUrl);
    // }
  }

  get username() {
    return this.signInForm.get('username');
  }

  get password() {
    return this.signInForm.get('password');
  }

}
