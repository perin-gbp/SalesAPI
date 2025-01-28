import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '../models/sale';

@Injectable({ providedIn: 'root' })
export class SaleService {
  private baseUrl = 'https://localhost:7119/api/sales';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.baseUrl);
  }

  getById(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.baseUrl}/${id}`);
  }

  create(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.baseUrl, sale);
  }

  update(sale: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${this.baseUrl}/${sale.id}`, sale);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  checkSaleNumberExists(saleNumber: string): Observable<boolean> {
    return this.http.get<boolean>(`https://localhost:7119/api/sales/check-sale-number/${saleNumber}`);
  }
}