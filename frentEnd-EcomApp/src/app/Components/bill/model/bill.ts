export interface Bill {
    id: number;
    billingDate: Date;
    customerId: number;
    productItems: ProductItem[];
    customer?: Customer;
  }
  
  export interface ProductItem {
    id: number;
    price: number;
    quantity: number;
    discount: number;
    productId: Product;
  }
  
  export interface Customer {
    id: number;
    name: string;
    email: string;
  }
  export interface Product{
      id:number;
      name:string;
      price:number;
      quantity:number;
}
export interface CustomerListResponse {
  _embedded: {
    customers: Customer[];
  };
}
