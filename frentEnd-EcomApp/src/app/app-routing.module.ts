import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBillComponent } from './Components/bill/views/bill/add-bill/add-bill.component';
import { BillComponent } from './Components/bill/views/bill/bill/bill.component';
import { CustomerComponent } from './Components/bill/views/customer/customer/customer.component';
import { AddCustomerComponent } from './Components/bill/views/customer/add-customer/add-customer.component';
import { InventoryComponent } from './Components/bill/views/inventory/inventory/inventory.component';
import { ProductItemComponent } from './Components/bill/views/productItem/product-item/product-item.component';

const routes: Routes = [
  { path: 'bill', component: BillComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'productItems', component: ProductItemComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
