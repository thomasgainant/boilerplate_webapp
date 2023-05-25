import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './base/login-form/login-form.component';
import { AuthInterceptor } from './base/auth.interceptor';
import { RegisterFormComponent } from './base/register-form/register-form.component';
import { ExamplePageComponent } from './content/example-page/example-page.component';
import { ExamplePageTwoComponent } from './content/example-page-two/example-page-two.component';
import { ExampleProductsPageComponent } from './content/example-products-page/example-products-page.component';
import { ExampleProductPageComponent } from './content/example-product-page/example-product-page.component';

const routes: Routes = [
  { path: '', component: ExamplePageComponent },
  { path: 'example', component: ExamplePageComponent },
  { path: 'example-2', component: ExamplePageTwoComponent },
  { path: 'products', component: ExampleProductsPageComponent },
  { path: 'product/:id', component: ExampleProductPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ExamplePageComponent,
    ExamplePageTwoComponent,
    ExampleProductsPageComponent,
    ExampleProductPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  exports: [ RouterModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
