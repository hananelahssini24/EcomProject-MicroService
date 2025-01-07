import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bill, Customer, CustomerListResponse } from '../../../model/bill';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillService } from '../../../service/bill.service';
import { CustomerService } from '../../../service/customer.service';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrl: './edit-bill.component.css'
})
export class EditBillComponent implements OnInit{
  errorMessage: string | undefined;
  customers: Customer[] = [];
  customer!:Customer;
  constructor(private fb:FormBuilder,
    private customerService: CustomerService,
    private billService: BillService){}
  @Input() bill?: Bill;
  @Output() refresh = new EventEmitter<void>(); // Déclarez l'événement Output
  formBill!: FormGroup;
  ngOnInit(): void {
    if (this.bill && this.bill.customer) {
      this.customer = this.bill.customer;
    }
    this.loadCustomers();
    if(this.bill){
      console.log("bill");
    console.log(this.bill);
    const dateString = this.bill.billingDate;
const billingDate = new Date(dateString); // Converts ISO string to a Date object
    this.formBill = this.fb.group({
      date: [billingDate.toISOString().split('T')[0], [Validators.required]],
      customer: [this.bill.customer, [Validators.required]],
    });
    }
  }
  onclose() {

    }
    loadCustomers(): void {
      this.customerService.getAllCustomers().subscribe({
        next: (data: CustomerListResponse) => {
          // Extract customers from the response
          this.customers = data._embedded.customers;  // Get the customers array from _embedded
          console.log("Fetched customers:", this.customers);
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors du chargement des clients.';
        },
      });
    }

    onSubmit(): void {
      console.log("TEST");
      
      if (this.formBill.valid) {
        const updatedBill: Bill = this.bill ? { ...this.bill } : new Bill();
        updatedBill.billingDate = this.formBill.value.date;
        updatedBill.customerId=this.formBill.value.customer.id
        // updatedBill.customer = this.formBill.value.customer;
        console.log("**************** Updated Bill ****************");
        console.log(updatedBill);
    
        this.billService.createBill(updatedBill).subscribe({
          next: (createdBill) => {
            console.log('Bill updated successfully:', createdBill);
            this.refresh.emit();
          },
          error: () => {
            this.errorMessage = 'Erreur lors de la mise à jour de la facture.';
          },
        });
      } else {
        console.log('Formulaire invalide');
      }
    }
    
    
  
}