import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private subscription: Subscription;

  loginForm = this.fb.group({
    username: [''],
    password: ['']
  });

  constructor(
    private authSvc: AuthService,
    private fb: FormBuilder,
    private router: Router,
    ) {}


  ngOnInit(): void {}

  onLogin(): void{
    const formValue = this.loginForm.value;
    this.authSvc.login(formValue).subscribe((res) => {
      if (res) {
        this.router.navigate(['']);
      }
    });
  }

}
