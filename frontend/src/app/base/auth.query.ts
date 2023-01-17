import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Query } from "src/data/query";
import { User } from "src/data/user.entity";
import { AuthState, AuthStore } from "./auth.store";

@Injectable({
  providedIn: 'root'
})
export class AuthQuery extends Query<AuthState>{
  public authed$:Observable<boolean>;
  public accessToken$:Observable<string | undefined>;

  constructor(private authStore:AuthStore){
    super(authStore);

    this.authed$ = this.select("authed");
    this.accessToken$ = this.select("accessToken");
  }

  saveUser(user:User){
    this.authStore.update({
      user: user
    });
  }

  saveToken(token:string | undefined){
    let authed = false;
    if(token){
      authed = true;
      localStorage.setItem("access_token", token);
    }
    else{
      localStorage.removeItem("access_token");
    }

    this.authStore.update({
      authed: authed,
      accessToken: token
    });
  }

  logout(){
    this.saveToken(undefined);
  }
}
