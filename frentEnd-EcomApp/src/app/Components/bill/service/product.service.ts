import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductListResponse } from '../model/bill';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8888/inventory-service/api/products';

  constructor(private http: HttpClient) {}

  // Récupérer un client par ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Récupérer tous les clients
  getAllProducts(): Observable<ProductListResponse> {
    return this.http.get<ProductListResponse>(this.apiUrl);
  }

  // Créer un nouveau client
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  deleteProduct(id: number){
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }
}