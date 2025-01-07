import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Product } from '../../../model/bill';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../service/customer.service';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrl: './edit-inventory.component.css'
})
export class EditInventoryComponent implements OnInit{
  errorMessage: string | undefined;

  constructor(private fb:FormBuilder,private productService: ProductService){}
  @Input() product?: Product;
  @Output() refresh = new EventEmitter<void>(); // Déclarez l'événement Output
  formProduct!: FormGroup;
  ngOnInit(): void {
    if(this.product){
      console.log("product");
    console.log(this.product);
    this.formProduct = this.fb.group({
      name: [this.product.name, [Validators.required]],
      price: [this.product.price, [Validators.required]],
      quantity: [this.product.quantity, [Validators.required]],
    });
    
    
    }
  }
  onclose() {

    }

    onSubmit(): void {
      if (this.formProduct.valid) {
        const newProduct: Product = new Product();
        if(this.product)
          newProduct.id=this.product?.id
        newProduct.name=this.formProduct.value.name;
        newProduct.price=this.formProduct.value.price;
        newProduct.quantity=this.formProduct.value.quantity;
        this.productService.createProduct(newProduct).subscribe({
          next: (createProduct) => {
            console.log('Product updated successfully:', createProduct);
            this.refresh.emit();
          },
          error: () => {
            this.errorMessage = 'Erreur lors de la création du produit.';
          }
        });
      } else {
        console.log('Formulaire invalide');
      }
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['product'] && this.product) {
        this.formProduct = this.fb.group({
          name: [this.product.name, [Validators.required]],
          price: [this.product.price, [Validators.required]],
          quantity: [this.product.quantity, [Validators.required]],
        });
      }
    }
}
