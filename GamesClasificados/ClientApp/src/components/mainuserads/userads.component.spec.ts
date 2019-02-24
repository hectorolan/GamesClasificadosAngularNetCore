import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseradsComponent } from './userads.component';

describe('UseradsComponent', () => {
  let component: UseradsComponent;
  let fixture: ComponentFixture<UseradsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseradsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseradsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
