import { Inject, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddProduct, Brand, Category, Product } from 'src/Models/product.model';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {
  
  isUpdate: boolean = false;
  productForm!: FormGroup;
  brandList: Brand[] = [];
  categoryList: Category[] = [];
  file!: File;
  product: AddProduct = {
    productId: '0',
    productName: '',
    brandId: '',
    categoryId: '',
    productModel: '',
    productPrice: '',
    productPhoto: '',
  };
  btnName: string = 'Add';
  headerName: string = 'Add Product';
  brandId!: string;
  categoryId!: string;

  constructor(private formBuilder: FormBuilder, private productServices: ProductsService,
    private dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public productData: Product) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productId: [''],
      productName: ['', Validators.required],
      brandId: ['', Validators.required],
      categoryId:['', Validators.required],
      productModel: ['', Validators.required],
      productPrice: ['', Validators.required],
      productPhoto: ['', Validators.required]
    });

    this.getAllBrand();
    this.getAllCategory();

    if(this.productData!=null) {
      this.product.brandId = this.productData.brandId;
      this.product.categoryId = this.productData.categoryId;
      this.isUpdate = true;
      this.headerName = 'Update Product';
      this.btnName = 'Update';
      this.productForm.controls['productId'].setValue(this.productData.productId);
      this.productForm.controls['productName'].setValue(this.productData.productName);
      this.productForm.controls['productModel'].setValue(this.productData.productModel);
      this.productForm.controls['productPrice'].setValue(this.productData.productPrice);
      this.productForm.controls['productPhoto'].setValue(this.productData.productPhoto);
    }

  }

  addImage(event: any) {
    this.file = event.target.files[0];
    this.productForm.controls['productPhoto'].setValue(this.file.name);
  }

  addProduct() {
    
    if(this.productData==null) {
      this.product.productName = this.productForm.controls['productName'].getRawValue();
      this.product.brandId = this.productForm.controls['brandId'].getRawValue();
      this.product.categoryId = this.productForm.controls['categoryId'].getRawValue();
      this.product.productModel = this.productForm.controls['productModel'].getRawValue();
      this.product.productPhoto = this.productForm.controls['productPhoto'].getRawValue();
      this.product.productPrice = this.productForm.controls['productPrice'].getRawValue();
      this.productServices.addProduct(this.product).subscribe({
        next: res => {
          this.productServices.addProductImage(res.productId, this.file).subscribe({
            next: () => alert('Image Successfully Uploaded'),
            error: err => alert(err.message),
          });
          alert('Product Added Successfully');
        },
        error: () => alert('Faild to add Product'), 
      });
    }
    else {
      var brand = this.productForm.controls['brandId'].getRawValue();
      var category = this.productForm.controls['categoryId'].getRawValue();
      this.product.productId = this.productData.productId;
      this.product.productName = this.productForm.controls['productName'].getRawValue();
      this.product.brandId = brand!='' ? brand : this.product.brandId;
      this.product.categoryId = category!='' ? category : this.product.categoryId;
      this.product.productModel = this.productForm.controls['productModel'].getRawValue();
      this.product.productPhoto = this.productData.productPhoto;
      this.product.productPrice = this.productForm.controls['productPrice'].getRawValue();
      
      var photo = this.productForm.controls['productPhoto'].getRawValue();
      this.productServices.updateProduct(this.product).subscribe({
        next: () => alert('Product Updated Successfully'),
        error: err => alert(err.message), 
      });

      if(this.productData.productPhoto!=photo) 
        this.productServices.updateImage(this.productData.productId, this.file)
          .subscribe({
            next: () => alert('Image Successfully Updated'),
            error: err => alert(err.message),
          });
    }
  
    
    this.dialogRef.close();
  }

  getAllBrand() {
    this.productServices.getAllBrand().subscribe(
      res => this.brandList = res,
    );
  }

  getAllCategory() {
    this.productServices.getAllCategory().subscribe(
      res => this.categoryList = res,
    );
  }

}
