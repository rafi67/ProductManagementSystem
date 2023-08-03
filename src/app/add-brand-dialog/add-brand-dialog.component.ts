import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Brand } from 'src/Models/product.model';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-add-brand-dialog',
  templateUrl: './add-brand-dialog.component.html',
  styleUrls: ['./add-brand-dialog.component.scss']
})
export class AddBrandDialogComponent implements OnInit {

  brandForm!: FormGroup;
  brand: Brand = {
    brandId: '0',
    brandName: '',
    brandCode: ''
  };

  constructor(private formBuilder: FormBuilder, private productServices: ProductsService,
    private dialogRef: MatDialogRef<AddBrandDialogComponent>) {}

  ngOnInit(): void {
    this.brandForm = this.formBuilder.group({
      brandName: ['', Validators.required],
      brandCode: ['', Validators.required]
    });
  }

  addBrand() {
    this.brand.brandName = this.brandForm.controls['brandName'].getRawValue();
    this.brand.brandCode = this.brandForm.controls['brandCode'].getRawValue();
    this.productServices.addBrand(this.brand).subscribe(
      {
        next: () => alert('Brand Successfully Added'),
        error: () => alert('Failed to add Brand')
       }
    );
    this.dialogRef.close();
  }

}
