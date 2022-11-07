import { Component } from '@angular/core';
import { ExampleQuery } from 'src/data/example/example.query';
import { AuthQuery } from './base/auth.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  exampleString:string = "1234abcd";
  authed:boolean = false;

  constructor(private readonly exampleQuery:ExampleQuery, private readonly authQuery:AuthQuery){}

  ngOnInit(){
    this.exampleQuery.exampleProperty$.subscribe((newValue)=>{
      this.exampleString = newValue;
    });

    this.authQuery.authed$.subscribe((newValue)=>{
      this.authed = newValue;
    });

  }
}
