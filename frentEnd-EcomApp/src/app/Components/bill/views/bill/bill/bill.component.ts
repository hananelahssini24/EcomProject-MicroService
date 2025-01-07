import { Component, OnInit } from '@angular/core';
import { Bill, BillListResponse } from '../../../model/bill';
import { BillService } from '../../../service/bill.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  bills: Bill[] = [];  // Array of Customer objects
  loading = true; 
  selectedBill!: Bill;             // Loading indicator
  billAddOpen:boolean=false;
  billEditOpen:boolean=false;
  errorMessage: string | null = null;  // Error message if the API call fails
  productItemOpen:boolean=false;
  constructor(private billService: BillService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    this.loading = true; // Set loading to true at the start of the method
    this.billService.getAllBills().subscribe({
      next: (data: Bill[]) => { // Adjust the type to Bill[] since the API returns an array
        console.log("Raw response:", data);
  
        // Assign the fetched bills to the component's property
        this.bills = data;
  
        console.log("Fetched bills:", this.bills);
        this.loading = false;
      },
      error: (err) => {
        console.error("Error fetching bills:", err);
        this.errorMessage = 'Erreur lors du chargement des factures.';
        this.loading = false;
      },
    });
  }
  
 

  deleteBill(id: number): void {
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
        this.billService.deleteBill(id).subscribe(() => {
          this.loadBills();
          Swal.fire('Succès', `${name} a été supprimé avec succès.`, 'success');
        });
      }
    });
  }
  

  billOpen(action: string, bill?: Bill): void {
    if (action === 'add') {
      this.billAddOpen=true
      this.billEditOpen = false;
    }
     if (action === 'edit' && bill) {
      this.selectedBill = bill;
      this.billAddOpen=false
      this.billEditOpen = true;
    }
    if(action==='detail' && bill){
      this.selectedBill=bill;
      this.productItemOpen=true;

    }
  }


  addProductItem() {
    this.router.navigateByUrl("/productItems");
    }
}
