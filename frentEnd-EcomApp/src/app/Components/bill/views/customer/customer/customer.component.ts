import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Customer, CustomerListResponse } from '../../../model/bill';
import { CustomerService } from '../../../service/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  loading = true;
  errorMessage: string | null = null;
  showModalCustomer:boolean=false;
  selectedCustomer!: Customer;
  customerAddOpen:boolean=false;
  constructor(private customerService: CustomerService,
    private fb: FormBuilder
  ) { }
  customerForm!: FormGroup;

  ngOnInit(): void {
    this.loadCustomers();
    this.customerForm = this.fb.group({
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]]
    });
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
  openModel(){
    this.showModalCustomer=true;
  }
  closeModel() {
    this.showModalCustomer=false;
    }

    onSubmitCustomer(): void {
      if (this.customerForm.valid) {
        const newCustomer = new Customer;
        newCustomer.name=this.customerForm.value.customerName;
        newCustomer.email=this.customerForm.value.customerEmail;
        this.customerService.createCustomer(newCustomer).subscribe({
          next: (createdCustomer) => {
            console.log('Customer created successfully:', createdCustomer);
            this.customers.push(createdCustomer); // Add new customer to the list
            this.closeModel();
            this.customerForm.reset();
          },
          error: () => {
            this.errorMessage = 'Erreur lors de la création du client.';
          }
        });
      } else {
        console.log('Formulaire invalide');
      }
    }






    deleteCustomer(id: number, name: string): void {
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
          this.customerService.deleteCustomer(id).subscribe(() => {
            this.loadCustomers();
            Swal.fire('Succès', `${name} a été supprimé avec succès.`, 'success');
          });
        }
      });
    }
    

    customerOpen(action: string, customer?: Customer): void {
       if (action === 'edit' && customer) {
        this.selectedCustomer = customer;
        this.customerAddOpen = true;
      }
    }
    
}

