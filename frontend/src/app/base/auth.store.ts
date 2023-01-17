import { Injectable } from "@angular/core";
import { Store } from "src/data/store";
import { User } from "src/data/user.entity";

export interface AuthState{
  authed:boolean;
  user:User | undefined;
  accessToken:string | undefined;
}

export function createInitialState():AuthState{
  const accessToken = localStorage.getItem("access_token");
  return {
    authed: accessToken ? true : false,
    user: undefined,
    accessToken: accessToken ? accessToken : undefined
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthStore extends Store<AuthState>{
  constructor(){
    super(createInitialState());
  }
}
