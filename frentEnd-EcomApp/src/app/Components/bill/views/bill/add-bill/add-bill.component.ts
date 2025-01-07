import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bill, Customer, CustomerListResponse } from '../../../model/bill';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillService } from '../../../service/bill.service';
import { CustomerService } from '../../../service/customer.service';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']  // Fixed typo: styleUrl -> styleUrls
})
export class AddBillComponent implements OnInit {
  errorMessage: string | undefined;
  customers: Customer[] = [];
  customer!: Customer;
  products=[
    {
      "id": "a5eb1878-c328-4fa6-b8b3-ca10962da9ba",
      "name": "Computer 22",
      "price": 3200.0,
      "quantity": 11
    },
    {
      "id": "fc7cfb55-3532-4f2f-8884-24153625822e",
      "name": "Imprimante",
      "price": 3900.0,
      "quantity": 19
    },
    {
      "id": "2",
      "name": "dell",
      "price": 111.0,
      "quantity": 11
    },
    {
      "id": "9.538487259534094",
      "name": "hp",
      "price": 112.0,
      "quantity": 12
    }
  ];
  @Input() bill?: Bill;
  @Output() refresh = new EventEmitter<void>(); // Declare the Output event

  formBill!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();

    this.formBill = this.fb.group({
      date: ['', [Validators.required]],
      customer: ['', [Validators.required]], // Ensure customer field is empty at the start
    });
  }

  // onclose() is not used, remove it if unnecessary
  onclose(): void {
    // Logic for closing can be implemented here if needed
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data: CustomerListResponse) => {
        this.customers = data._embedded.customers; // Get the customers array from _embedded
        console.log('Fetched customers:', this.customers);
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des clients.';
      },
    });
  }

  onSubmit(): void {
    if (this.formBill.valid) {
      const newBill: Bill = new Bill();
      const values = this.formBill.value;
      
      // Fix the reference to customer id
      newBill.billingDate = values.date;
      newBill.customerId = values.customer.id;  
      // newBill.customer = values.customer;
      console.log("new bill");
      console.log(newBill);
      
      
      this.billService.createBill(newBill).subscribe(
        (response: Bill) => {
          this.refresh.emit(); // Emit the refresh event after successful creation
        },
        (error: any) => {
          console.error('Error saving bill:', error);
        }
      );
    }
  }
}
