import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/data/product.entity';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-example-products-page',
  templateUrl: './example-products-page.component.html',
  styleUrls: ['./example-products-page.component.css']
})
export class ExampleProductsPageComponent implements OnInit {
  public products:Product[] = [];

  constructor(private readonly http:HttpClient) { }

  ngOnInit(): void {
    this.http.get<Product[]>(environment.api+"/product").subscribe(result => {
      this.products = result;
    });
  }

}
