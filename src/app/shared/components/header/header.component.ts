import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isAdmin = null;
  isLogged = false;

  private subscription: Subscription;

  constructor(private authSvc: AuthService) { }


  ngOnInit(): void {
    this.authSvc.isLogged.subscribe((res) => (this.isLogged = res));
    this.authSvc.isAdmin$.subscribe((res) => (this.isAdmin = res));
  }

  onLogout(): void{
    this.authSvc.logout();
  }

}
