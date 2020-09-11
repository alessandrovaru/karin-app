import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin = false;

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
  }

  onLogout(): void{
    this.authSvc.logout();
  }

}
