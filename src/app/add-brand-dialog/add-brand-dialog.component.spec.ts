import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrandDialogComponent } from './add-brand-dialog.component';

describe('AddBrandDialogComponent', () => {
  let component: AddBrandDialogComponent;
  let fixture: ComponentFixture<AddBrandDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBrandDialogComponent]
    });
    fixture = TestBed.createComponent(AddBrandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
