export class Bill {
    id!: number;
    billingDate!: Date;
    customerId!: number;
    productItems!: ProductItem[];
    customer?: Customer;
  }
  
  export class ProductItem {
    id!: number;
    unitPrice!: number;
    quantity!: number;
    productId!: string;
    bill!:Bill
    product?: Product;
  }
  
  export class Customer {
    id!: number;
    name!: string;
    email!: string;
  }
  export class Product{
      id!: number;
      name!: string;
      price!: number;
      quantity!: number;
}
export class CustomerListResponse {
  _embedded!: {
    customers: Customer[];
  };
}
export class ProductListResponse {
  _embedded!: {
    products:  Product[];
  };
}

export class BillListResponse {
  _embedded!: {
    bills:  Bill[];
  };
}