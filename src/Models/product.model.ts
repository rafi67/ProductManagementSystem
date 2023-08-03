
export interface Product {
    productId: string;
    categoryId: string;
    brandId: string;
    productName: string;
    productPhoto: string;
    productModel: string;
    productPrice: string;
    productBrand: string;
    categoryName: string;
}

export interface AddProduct {
    productId: string;
    categoryId: string;
    brandId: string;
    productName: string;
    productModel: string;
    productPrice: string;
    productPhoto: string;
}

export interface Brand {
    brandId: string;
    brandName: string;
    brandCode: string;
}

export interface Category {
    categoryId: string;
    categoryName: string;
    categoryCode: string;
}
