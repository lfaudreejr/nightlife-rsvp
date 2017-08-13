import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YelpFormComponent } from './yelp-form.component';

describe('YelpFormComponent', () => {
  let component: YelpFormComponent;
  let fixture: ComponentFixture<YelpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YelpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YelpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
