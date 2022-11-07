import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  form:FormGroup = new FormGroup({
    'email': new FormControl('', [ Validators.required, Validators.email ]),
    'login': new FormControl('', [ Validators.required ]),
    'password': new FormControl('', [ Validators.required ]),
    'confirmPassword': new FormControl('', [ Validators.required, this.passwordMatch() ])
  });

  public errors:string[] = [];

  constructor(private readonly http:HttpClient) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){

  }

  passwordMatch():ValidatorFn{
    return (control:AbstractControl):ValidationErrors | null => {
      if(control.value && this.form.get('password')?.value && control.value != this.form.get('password')?.value){
        return { passwordConfirmationMismatch: "Password and password confirmation do not match." };
      }
      return null;
    }
  }

  submitRegisterForm(){
    this.form.updateValueAndValidity();

    if(this.form.valid){
      this.http.post(environment.api+'/register', {
        email: this.form.get('email')?.value,
        name: this.form.get('login')?.value,
        password: this.form.get('password')?.value,
      }).pipe(
        catchError(this.handleError.bind(this))
      ).subscribe((data:any) => {
        console.log(data);
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
}
