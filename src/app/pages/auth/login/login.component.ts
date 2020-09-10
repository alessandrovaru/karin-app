import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {
    const userData = {
      username: 'alessandrovaru@gmail.com',
      password: 'a123456789',
    };
    this.authSvc.login(userData).subscribe( res => console.log('logged'));
  }

}