import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/data/product.entity';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-example-product-page',
  templateUrl: './example-product-page.component.html',
  styleUrls: ['./example-product-page.component.css']
})
export class ExampleProductPageComponent implements OnInit {
  public product:Product | undefined;

  constructor(private readonly http:HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.http.get<Product>(environment.api+"/product/"+params["id"]).subscribe(result => {
        this.product = result;
      });
    });
  }

  buy(){
    if(this.product){
      this.http.get(environment.api+"/payment/"+this.product.id, { responseType: 'text' as const }).subscribe(result => {
        window.location.href = result;
      });
    }
  }

}
