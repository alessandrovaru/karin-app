import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: [''],
    password: [''],
    role: ['student']
  });


  constructor(
    private authSvc: AuthService,
    private fb: FormBuilder,
    private router: Router,
    ) {}


  ngOnInit(): void { }

  onLogin(): void{
    const formValue = this.loginForm.value;
    console.log(formValue);
    this.authSvc.login(formValue).subscribe((res) => {
      if (res) {
        this.router.navigate(['']);
      }
    });
  }

  onSignUp(f: NgForm): void{
    this.authSvc.signUp(f.value).subscribe((res) => {
      if (res) {
        this.router.navigate(['']);
      }
    });
  }



}
