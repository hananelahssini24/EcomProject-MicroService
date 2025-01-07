import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductItem } from '../model/bill';

@Injectable({
  providedIn: 'root'
})
export class ProductItemService {
private apiUrl = 'http://localhost:8888/billing-service/productitems';

constructor(private http: HttpClient) {}

// Récupérer un client par ID
getProductItemById(id: number): Observable<ProductItem> {
  return this.http.get<ProductItem>(`${this.apiUrl}/${id}`);
}

// Récupérer tous les clients
getAllProductItems(): Observable<ProductItem[]> {
  return this.http.get<ProductItem[]>(this.apiUrl);
}

// Créer un nouveau client
createProductItem(ProductItem: ProductItem): Observable<ProductItem> {
  return this.http.post<ProductItem>(this.apiUrl, ProductItem);
}

deleteProductItem(id: number){
  return this.http.delete<ProductItem>(`${this.apiUrl}/${id}`);
}




}
