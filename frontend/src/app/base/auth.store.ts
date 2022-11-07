import { Injectable } from "@angular/core";
import { Store } from "src/data/store";

export interface AuthState{
  authed:boolean;
  accessToken:string | undefined;
}

export function createInitialState():AuthState{
  const accessToken = localStorage.getItem("access_token");
  return {
    authed: accessToken ? true : false,
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
