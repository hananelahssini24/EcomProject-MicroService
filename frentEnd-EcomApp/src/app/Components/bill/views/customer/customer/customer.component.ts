import { Component, OnInit } from '@angular/core';
import { Customer, CustomerListResponse } from '../../../model/bill';
import { CustomerService } from '../../../service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];  // Array of Customer objects
  loading = true;              // Loading indicator
  errorMessage: string | null = null;  // Error message if the API call fails

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data: CustomerListResponse) => {
        // Extract customers from the response
        this.customers = data._embedded.customers;  // Get the customers array from _embedded
        console.log("Fetched customers:", this.customers);

        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des clients.';
        this.loading = false;
      },
    });
  }
}

