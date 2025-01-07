import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Bill, Product, ProductItem, ProductListResponse } from '../../../model/bill';
import { ProductItemService } from '../../../service/product-item.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import { BillService } from '../../../service/bill.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent implements OnInit {
taxOpen(test: string) {
}
goBack() {
}
  productItems: ProductItem[] = [];
  @Input() bill!: Bill;
  showModalProdItem:boolean=false
  products: Product[] = [];
  loading = true; 
  selectedProductItem!: ProductItem;
  ProductItemAddOpen:boolean=false;
  ProductItemEditOpen:boolean=false;
  showModalProductItem:boolean=false;
  errorMessage: string | null = null;  // Error message if the API call fails
  prodItemForm!: FormGroup;
  @Output() refresh = new EventEmitter<void>(); // Déclarez l'événement Output
  constructor(private productItemService: ProductItemService,
    private billService: BillService,
    private productService: ProductService,private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadProductItems();
    this.loadproducts()
    this.prodItemForm = this.fb.group({
      productId: ['', Validators.required],
      quantity: ['', Validators.required],
      unitPrice: ['', Validators.required],
  });
  }

  loadProductItems(): void {
    this.loading = true; // Set loading to true at the start of the method
    this.productItemService.getAllProductItems().subscribe({
      next: (data: ProductItem[]) => { // Adjust the type to ProductItem[] since the API returns an array
        console.log("Raw response:", data);
  
        // Assign the fetched ProductItems to the component's property
        this.productItems = data;
  
        console.log("Fetched ProductItems:", this.productItems);
        this.loading = false;
      },
      error: (err) => {
        console.error("Error fetching ProductItems:", err);
        this.errorMessage = 'Erreur lors du chargement des factures.';
        this.loading = false;
      },
    });
  }
  
  openModel(){
    this.showModalProductItem=true;
  }
  closeModel() {
    this.showModalProductItem=false;
    }

  deleteProductItem(id: number): void {
    Swal.fire({
      title: 'Confirmation de suppression',
      text: `Voulez-vous vraiment supprimer ${name} ?`, // Utilisation directe du nom
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productItemService.deleteProductItem(id).subscribe(() => {
          this.loadProductItems();
          Swal.fire('Succès', `${name} a été supprimé avec succès.`, 'success');
        });
      }
    });
  }
  

  ProductItemOpen(action: string, ProductItem?: ProductItem): void {
    if (action === 'add') {
      this.ProductItemAddOpen=true
      this.ProductItemEditOpen = false;
    }
     if (action === 'edit' && ProductItem) {
      this.selectedProductItem = ProductItem;
      this.ProductItemAddOpen=false
      this.ProductItemEditOpen = true;
    }
  }

// *****************************
ngOnChanges(changes: SimpleChanges): void {
}



 openAddProdItem() {
  this.showModalProdItem = true
  console.log("gggg");
  
 }
 oncloseProdItem(): void {
  this.showModalProdItem=false;}
  updatedBill!: Bill;
  getBillById(billId:number): void {
    this.loading = true; // Set loading to true at the start of the method
    this.billService.getBillById(billId).subscribe({
      next: (data: Bill) => { // Adjust the type to Bill[] since the API returns an array
       
  
        // Assign the fetched bills to the component's property
        this.bill = data;
        console.log("Raw response:", this.bill);
        this.loading = false;
      },
    });
  }
  onSubmitProdItem() {
    let sendProdItem=new ProductItem;
    sendProdItem.bill=this.bill;
    sendProdItem.productId=this.prodItemForm.value.productId.id;
    sendProdItem.quantity=this.prodItemForm.value.quantity;
    sendProdItem.unitPrice=this.prodItemForm.value.unitPrice;
    console.log("****sendProdItem****");
    console.log(sendProdItem);
    this.productItemService.createProductItem(sendProdItem).subscribe(
      (response: ProductItem) => {
        this.refresh.emit();
        this.getBillById(this.bill.id);
        this.oncloseProdItem()
      },
      (error: any) => {
        console.error('Error saving ProductItem:', error);
      }
    );
    
    } 
    loadproducts(): void {
      this.productService.getAllProducts().subscribe({
        next: (data: ProductListResponse) => {
          // Extract products from the response
          this.products = data._embedded.products;  // Get the products array from _embedded
          console.log("Fetched products:", this.products);
  
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors du chargement des produits.';
          this.loading = false;
        },
      });
    }



    onDelete(productItemId: number): void {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this product item? This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.loading = true; // Active un indicateur de chargement
          this.productItemService.deleteProductItem(productItemId).subscribe({
            next: () => {
              // Mise à jour de la liste localement
              this.bill.productItems = this.bill.productItems.filter(
                (item) => item.id !== productItemId
              );
              Swal.fire(
                'Deleted!',
                'The product item has been deleted.',
                'success'
              );
            },
            error: (err) => {
              console.error('Error while deleting product item:', err);
              Swal.fire(
                'Error!',
                'An error occurred while trying to delete the product item.',
                'error'
              );
            },
            complete: () => {
              this.loading = false; // Désactive le chargement
            }
          });
        }
      });
    }
    
    
}

  