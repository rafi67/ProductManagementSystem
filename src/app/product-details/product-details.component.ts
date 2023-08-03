import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from 'src/services/products.service';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { User } from 'src/Models/users.model';
import { Product } from 'src/Models/product.model';
import { UserData } from 'src/sharedService/userData.shared.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  user!:User;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['ProductName', 'ProductBrand', 'ProductCategory', 'ProductModel', 'ProductPrice', 'ProductPhoto', 'EditProduct', 'DeleteProduct'];
  imagePath: string = 'https://localhost:7071/Pictures';
  constructor(private sharedData: UserData,
    private dialog: MatDialog, private productServices:ProductsService) {}

  ngOnInit(): void {
    this.getAllProduct();
    this.user = this.sharedData.getData();
  }

  getAllProduct() {
    this.productServices.getAllProduct().subscribe({
      next: res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => alert('Erorr while fatching data'),
    });
  }

   searchProduct(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddProductDialog() {
    this.dialog.open(AddProductDialogComponent).afterClosed().subscribe(
     {
      next: () => this.getAllProduct(),
      error: () => alert('Failed to Add Prodcut')
     }
    );
  }

  openUpdateProductDialog(productData: Product) {
    this.dialog.open(AddProductDialogComponent, {
      data: productData,
    }).afterClosed().subscribe(
      () => this.getAllProduct(),
    )
  }

  deleteProduct(id: string) {
    this.productServices.deleteProduct(id).subscribe({
      next: () => {
        alert('Product Deleted Successfully');
        this.getAllProduct();
      },
      error: () => alert('Failed to Delete Product')
    });
  }

  downloadPdf() {
    const doc = new jsPDF();
    autoTable(doc, {html:"#myTable"});
    autoTable(doc, {
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 0) {
          var base64Img = 'data:image/jpeg;base64,iVBORw0KGgoAAAANS...';
          doc.addImage(base64Img, 'JPEG', data.cell.x + 2, data.cell.y + 2, 10, 10);
        }
      },
    })
    doc.save("test");
  }
  
}
