import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProduct, Brand, Category, Product } from 'src/Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'https://localhost:7071/api/Products/';

  getAllProduct() : Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl+'GetAllProduct');
  }

  getAllCategory() : Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl+'GetAllCategory');
  }

  getCategory(id: string) : Observable<Category> {
    return this.http.get<Category>(this.baseUrl+'GetCategory/'+id);
  }

  getAllBrand() : Observable<Brand[]> {
    return this.http.get<Brand[]>(this.baseUrl+'GetAllBrand');
  }

  getBrand(id: string) : Observable<Brand> {
    return this.http.get<Brand>(this.baseUrl+'GetBrand/'+id);
  }

  addProduct(data: AddProduct) : Observable<AddProduct> {
    return this.http.post<AddProduct>(this.baseUrl+'AddProduct', data);
  }

  updateProduct(data: AddProduct) : Observable<Response> {
    return this.http.put<Response>(this.baseUrl+'UpdateProduct', data);
  }

  addProductImage(id: string, image: File) : Observable<Response> {
    var formData = new FormData();
    formData.append('image', image);
    return this.http.post<Response>(this.baseUrl+'UploadProductImg/'+id, formData);
  }

  updateImage(id: string, image: File) : Observable<Response> {
    var formData = new FormData();
    formData.append('image', image);
    return this.http.put<Response>(this.baseUrl+'UpdateProductImage/'+id, formData);
  }

  addBrand(data: Brand) : Observable<Response>{
    return this.http.post<Response>(this.baseUrl+'AddBrand', data);
  }

  addCategory(data: Category) : Observable<Response>{
    return this.http.post<Response>(this.baseUrl+'AddCategory', data);
  }

  deleteProduct(id: string) : Observable<Response>{
    return this.http.delete<Response>(this.baseUrl+'DeleteProduct/'+id);
  }

}
