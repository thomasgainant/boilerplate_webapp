import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Query } from "../query";
import { ExampleState, ExampleStore } from "./example.store";

@Injectable({
  providedIn: 'root'
})
export class ExampleQuery extends Query<ExampleState>{
  public exampleProperty$:Observable<string>;

  constructor(private exampleStore:ExampleStore){
    super(exampleStore);

    this.exampleProperty$ = this.select("exampleProperty");
  }
}
