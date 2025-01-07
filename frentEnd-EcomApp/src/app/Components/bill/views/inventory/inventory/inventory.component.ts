import { Component, OnInit } from '@angular/core';
import { Product, ProductListResponse } from '../../../model/bill';
import { ProductService } from '../../../service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  errorMessage: string | null = null;
  showModalProduct:boolean=false;
  selectedProduct!: Product;
  productAddOpen:boolean=false;
  constructor(private productService: ProductService,
    private fb: FormBuilder
  ) { }
  productForm!: FormGroup;

  ngOnInit(): void {
    this.loadproducts();
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]]
    });
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
  openModel(){
    this.showModalProduct=true;
  }
  closeModel() {
    this.showModalProduct=false;
    }

    onSubmitProduct(): void {
      if (this.productForm.valid) {
        const newProduct = new Product;
        newProduct.id=(Math.random());
        newProduct.name=this.productForm.value.name;
        newProduct.price=this.productForm.value.price;
        newProduct.quantity=this.productForm.value.quantity;
        console.log(newProduct);
        this.productService.createProduct(newProduct).subscribe({
          next: (createdProduct) => {
            console.log(createdProduct);
            
            console.log('Product created successfully:', createdProduct);
            this.products.push(createdProduct);
            this.closeModel();
            this.productForm.reset();
          },
          error: () => {
            this.errorMessage = 'Erreur lors de la création du produit.';
          }
        });
      } else {
        console.log('Formulaire invalide');
      }
    }






    deleteProduct(id: number, name: string): void {
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
          this.productService.deleteProduct(id).subscribe(() => {
            this.loadproducts();
            Swal.fire('Succès', `${name} a été supprimé avec succès.`, 'success');
          });
        }
      });
    }
    

    productOpen(action: string, product?: Product): void {
       if (action === 'edit' && product) {
        this.selectedProduct = product;
        this.productAddOpen = true;
      }
    }
}