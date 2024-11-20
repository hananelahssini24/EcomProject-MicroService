import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBillComponent } from './Components/bill/views/bill/add-bill/add-bill.component';
import { BillComponent } from './Components/bill/views/bill/bill/bill.component';
import { CustomerComponent } from './Components/bill/views/customer/customer/customer.component';
import { AddCustomerComponent } from './Components/bill/views/customer/add-customer/add-customer.component';

const routes: Routes = [
  { path: 'bill', component: BillComponent },
  { path: 'bill/add', component: AddBillComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'customer/add', component: AddCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
