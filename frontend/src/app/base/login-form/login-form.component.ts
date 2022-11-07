import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthQuery } from '../auth.query';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form:FormGroup = new FormGroup({
    'login': new FormControl('', [ Validators.required ]),
    'password': new FormControl('', [ Validators.required ])
  });

  public authed:boolean = false;
  public errors:string[] = [];

  constructor(private readonly authQuery:AuthQuery, private readonly http:HttpClient) { }

  ngOnInit(): void {
    this.authQuery.authed$.subscribe((newValue)=>{
      this.authed = newValue;
    });
  }

  submitLoginForm(){
    if(this.form.valid){
      this.http.post(environment.api+'/login', {
        login: this.form.get('login')?.value,
        password: this.form.get('password')?.value,
      }).pipe(
        catchError(this.handleError.bind(this))
      ).subscribe((data:any) => {
        this.authQuery.saveToken(data.access_token);
      });
    }
    else{
      this.errors = [];
      for(let key in this.form.controls){
        let control = this.form.controls[key];
        if(!control.valid){
          for(let controlErrorKey in control.errors){
            if(controlErrorKey == "required"){
              this.errors.push(key+" is required.");
            }
            else{
              this.errors.push(control.errors[controlErrorKey]);
            }
          }
        }
      }
    }
  }

  private handleError(error: HttpErrorResponse) {
    this.errors = [];
    this.errors.push(error.error.message);
    return throwError(() => new Error(error.error.message));
  }

  clickLogoutButton(){
    this.authQuery.logout();
  }

}
