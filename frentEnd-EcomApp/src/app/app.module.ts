import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBillComponent } from './Components/bill/views/bill/add-bill/add-bill.component';
import { EditBillComponent } from './Components/bill/views/bill/edit-bill/edit-bill.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomerComponent } from './Components/bill/views/customer/customer/customer.component';
import { AddCustomerComponent } from './Components/bill/views/customer/add-customer/add-customer.component';
import { EditCustomerComponent } from './Components/bill/views/customer/edit-customer/edit-customer.component';
import { InventoryComponent } from './Components/bill/views/inventory/inventory/inventory.component';
import { AddInventoryComponent } from './Components/bill/views/inventory/add-inventory/add-inventory.component';
import { EditInventoryComponent } from './Components/bill/views/inventory/edit-inventory/edit-inventory.component';
import { BillComponent } from './Components/bill/views/bill/bill/bill.component';
@NgModule({
  declarations: [
    AppComponent,
    AddBillComponent,
    EditBillComponent,
    CustomerComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    InventoryComponent,
    AddInventoryComponent,
    EditInventoryComponent,
    BillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
