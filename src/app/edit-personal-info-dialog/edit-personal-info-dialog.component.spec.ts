import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonalInfoDialogComponent } from './edit-personal-info-dialog.component';

describe('EditPersonalInfoDialogComponent', () => {
  let component: EditPersonalInfoDialogComponent;
  let fixture: ComponentFixture<EditPersonalInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPersonalInfoDialogComponent]
    });
    fixture = TestBed.createComponent(EditPersonalInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
