import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PickrolePage } from './pickrole.page';

describe('PickrolePage', () => {
  let component: PickrolePage;
  let fixture: ComponentFixture<PickrolePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PickrolePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
