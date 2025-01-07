import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, CustomerListResponse } from '../model/bill';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8888/customer-service/api/customers'; // URL du backend Feign Client

  constructor(private http: HttpClient) {}

  // Récupérer un client par ID
  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  // Récupérer tous les clients
  getAllCustomers(): Observable<CustomerListResponse> {
    return this.http.get<CustomerListResponse>(this.apiUrl);
  }

  // Créer un nouveau client
  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  deleteCustomer(id: number){
    return this.http.delete<Customer>(`${this.apiUrl}/${id}`);
  }
}