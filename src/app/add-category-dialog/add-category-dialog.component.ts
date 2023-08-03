import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/Models/product.model';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss']
})
export class AddCategoryDialogComponent implements OnInit {

  categoryForm!: FormGroup;
  category: Category = {
    categoryId: '0',
    categoryName: '',
    categoryCode: ''
  };

  constructor(private productServices: ProductsService, private dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      categoryCode: ['', Validators.required]
    });
  }

  addCategory() {
    this.category.categoryName = this.categoryForm.controls['categoryName'].getRawValue();
    this.category.categoryCode = this.categoryForm.controls['categoryCode'].getRawValue();
    this.productServices.addCategory(this.category).subscribe({
      next: () => alert('Successfully added'),
      error: () => alert('Failed to add Category')
    });
    this.dialogRef.close();
  }

}
