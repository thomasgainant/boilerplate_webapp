import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleProductPageComponent } from './example-product-page.component';

describe('ExampleProductPageComponent', () => {
  let component: ExampleProductPageComponent;
  let fixture: ComponentFixture<ExampleProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleProductPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
