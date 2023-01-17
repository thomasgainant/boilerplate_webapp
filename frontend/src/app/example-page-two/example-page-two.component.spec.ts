import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplePageTwoComponent } from './example-page-two.component';

describe('ExamplePageTwoComponent', () => {
  let component: ExamplePageTwoComponent;
  let fixture: ComponentFixture<ExamplePageTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamplePageTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplePageTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
