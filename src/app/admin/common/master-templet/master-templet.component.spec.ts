import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTempletComponent } from './master-templet.component';

describe('MasterTempletComponent', () => {
  let component: MasterTempletComponent;
  let fixture: ComponentFixture<MasterTempletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasterTempletComponent]
    });
    fixture = TestBed.createComponent(MasterTempletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
