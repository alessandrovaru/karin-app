import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/pages/auth/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(private authSvc: AuthService){}

  canActivate(): Observable<boolean | UrlTree>{
    return this.authSvc.isLogged.pipe(
      take(1),
      map((isLogged) => !isLogged)
    );
  }

}
