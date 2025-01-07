import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill, BillListResponse } from '../model/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private apiUrl = 'http://localhost:8888/billing-service/bills';

  constructor(private http: HttpClient) {}

  // Récupérer un client par ID
  getBillById(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.apiUrl}/${id}`);
  }

  // Récupérer tous les clients
  getAllBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.apiUrl);
  }

  // Créer un nouveau client
  createBill(Bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.apiUrl, Bill);
  }

  deleteBill(id: number){
    return this.http.delete<Bill>(`${this.apiUrl}/${id}`);
  }



  
}