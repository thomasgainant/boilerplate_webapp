import { Injectable } from "@angular/core";
import { Store } from "../store";

export interface ExampleState{
  exampleProperty:string;
}

export function createInitialState():ExampleState{
  return {
    exampleProperty: "abcd1234"
  };
}

@Injectable({
  providedIn: 'root'
})
export class ExampleStore extends Store<ExampleState>{
  constructor(){
    super(createInitialState());
  }
}
