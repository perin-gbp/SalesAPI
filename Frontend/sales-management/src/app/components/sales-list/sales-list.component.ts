import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { Sale } from '../../models/sale';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-list',
  standalone: true,
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss'],
  imports:[
    CommonModule
  ]
})
export class SalesListComponent implements OnInit {
  sales: Sale[] = [];
  searchText: string = '';

  constructor(private saleService: SaleService, private router: Router) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.saleService.getAll().subscribe((data) => {
      this.sales = data;
    });
  }

  addSale(): void {
    this.router.navigate(['/sales/new']);
  }

  editSale(id: number): void {
    this.router.navigate([`/sales/edit/${id}`]);
  }

  deleteSale(id: number): void {
    if (confirm('Are you sure you want to delete this sale?')) {
      this.saleService.delete(id).subscribe(() => {
        this.sales = this.sales.filter(sale => sale.id !== id);
      });
    }
  }
}