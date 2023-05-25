import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleProductsPageComponent } from './example-products-page.component';

describe('ExampleProductsPageComponent', () => {
  let component: ExampleProductsPageComponent;
  let fixture: ComponentFixture<ExampleProductsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleProductsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
