import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserResponse, User } from '@app/shared/models/user.interface';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(authData: User): Observable<UserResponse | void>{
    return this.http
    .post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
    .pipe(
        map((res: UserResponse) => {
          console.log('res:', res);
          // savetoken()
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  logout(): void{}
  private readToken(): void{}
  private saveToken(): void{}
  private handlerError(err): Observable<never>{
    let errorMessage = 'Error retrieving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


}
