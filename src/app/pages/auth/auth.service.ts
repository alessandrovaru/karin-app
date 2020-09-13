import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { UserResponse, User, Roles, NewUser, UserCreated } from '@app/shared/models/user.interface';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<Roles>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  get isAdmin$(): Observable<string>{
    return this.role.asObservable();
  }

  login(authData: User): Observable<UserResponse | void>{
    console.log(authData);

    return this.http
    .post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
    .pipe(
        map((res: UserResponse) => {
          this.saveLocalStorage(res);
          this.loggedIn.next(true);
          return res;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  signUp(authData: NewUser): Observable<UserCreated | void>{
    return this.http
    .post<UserCreated>(`${environment.API_URL}/users`, authData)
    .pipe(
      map((res: UserCreated) => {
        console.log(res);
        this.saveLocalStorage(res);
        this.loggedIn.next(true);
        return res;
      }),
      catchError((err) => this.handlerError(err))
    );
  }




  logout(): void{
    this.role.next(null);
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }

  private checkToken(): void{
    const user = JSON.parse(localStorage.getItem('user')) || null;

    if (user) {
      const isExpired = helper.isTokenExpired(user.token);

      if (isExpired) {
        this.logout();
      }else{
        this.loggedIn.next(true);
        this.role.next(user.role);
      }
    }
  }
  private saveLocalStorage(user: UserResponse): void{
    const {userId, message, ...rest} = user;
    localStorage.setItem('user', JSON.stringify(rest));
    this.role.next(user.role);
  }

  private handlerError(err): Observable<never>{
    let errorMessage = 'Error retrieving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
