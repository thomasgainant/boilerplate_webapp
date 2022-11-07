import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthQuery } from './auth.query';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private accessToken:string | undefined;

  constructor(private authQuery:AuthQuery) {
    this.authQuery.accessToken$.subscribe((newValue)=>{
      this.accessToken = newValue;
      console.log(this.accessToken);
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.accessToken && this.accessToken != ""){
      const copy = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + this.accessToken)
      });
      return next.handle(copy);
    }
    return next.handle(request);
  }
}
