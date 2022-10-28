import { Component } from '@angular/core';
import { ExampleQuery } from 'src/data/example/example.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  exampleString:string = "1234abcd";

  constructor(private exampleQuery:ExampleQuery){}

  ngOnInit(){
    this.exampleQuery.exampleProperty$.subscribe((newValue)=>{
      this.exampleString = newValue;
    });
  }
}
