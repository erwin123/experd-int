import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessfirstComponent } from './assessfirst.component';

describe('AssessfirstComponent', () => {
  let component: AssessfirstComponent;
  let fixture: ComponentFixture<AssessfirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessfirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessfirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
