import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialDialogComponent } from './credential-dialog.component';

describe('CredentialDialogComponent', () => {
  let component: CredentialDialogComponent;
  let fixture: ComponentFixture<CredentialDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CredentialDialogComponent]
    });
    fixture = TestBed.createComponent(CredentialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
