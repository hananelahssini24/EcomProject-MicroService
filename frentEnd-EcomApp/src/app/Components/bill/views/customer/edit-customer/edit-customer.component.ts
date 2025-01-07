import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Customer } from '../../../model/bill';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../service/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent  implements OnInit{
  errorMessage: string | undefined;

  constructor(private fb:FormBuilder,private customerService: CustomerService){}
  @Input() customer?: Customer;
  @Output() refresh = new EventEmitter<void>(); // Déclarez l'événement Output
  formCustomer!: FormGroup;
  ngOnInit(): void {
    if(this.customer){
      console.log("customer");
    console.log(this.customer);
    this.formCustomer = this.fb.group({
      name: [this.customer.name, [Validators.required]],
      email: [this.customer.email, [Validators.required, Validators.email]],
    });
    
    
    }
  }
  onclose() {

    }

    onSubmit(): void {
      if (this.formCustomer.valid) {
        const newCustomer: Customer = new Customer();
        if(this.customer)
          newCustomer.id=this.customer?.id
        newCustomer.name=this.formCustomer.value.name;
        newCustomer.email=this.formCustomer.value.email;
        this.customerService.createCustomer(newCustomer).subscribe({
          next: (createdCustomer) => {
            console.log('Customer updated successfully:', createdCustomer);
            this.refresh.emit();
          },
          error: () => {
            this.errorMessage = 'Erreur lors de la création du client.';
          }
        });
      } else {
        console.log('Formulaire invalide');
      }
    }
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['customer'] && this.customer) {
        this.formCustomer = this.fb.group({
          name: [this.customer.name, [Validators.required]],
          email: [this.customer.email, [Validators.required, Validators.email]],
        });
      }
    }
}
