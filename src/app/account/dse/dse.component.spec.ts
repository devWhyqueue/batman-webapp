import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DseComponent} from './dse.component';

describe('DseComponent', () => {
  let component: DseComponent;
  let fixture: ComponentFixture<DseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DseComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
