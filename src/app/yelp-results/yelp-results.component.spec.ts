import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YelpResultsComponent } from './yelp-results.component';

describe('YelpResultsComponent', () => {
  let component: YelpResultsComponent;
  let fixture: ComponentFixture<YelpResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YelpResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YelpResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
