import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthloginService } from '../services/authlogin.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Account } from '../models/account.model';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup = null;
  registerForm: FormGroup = null;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = false;
  rememberMe = false;
  basic = false;
  constructor(public authService: AuthloginService, public router: Router,private route: ActivatedRoute,
    private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    if (localStorage.getItem('currentUser') ) {
      this.router.navigate(['/']);
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = new FormGroup({
      username: new FormControl('erwin.ant@gmail.com', [<any>Validators.required]),
      password: new FormControl('Sunter123', [<any>Validators.required]),
      rememberMe: new FormControl(false)
    });

    this.registerForm = new FormGroup({
      usernameNew: new FormControl('', [<any>Validators.required]),
      passwordNew: new FormControl('', [<any>Validators.required]),
      confirmPasswordNew: new FormControl('', [<any>Validators.required]),
    });
  }

  login(formValue: any, isValid: boolean) {
    this.loading = true;
    this.loginForm.disable();
    if (isValid) {
      this.authService.login(formValue.username, formValue.password, formValue.rememberMe)
        .subscribe(
          res => {
            setTimeout(()=>{this.router.navigate([this.returnUrl]);},1000);
          },
          err => {
            this.loginForm.enable();
            this.loginForm.reset();
            this.loading = false;
            this.error = true;
            setTimeout(()=>{
              this.error = false;
            },5000);
          });
    }
  }

  register(formValue: any, isValid: boolean){
  
  }
}