import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports:[
    CommonModule
  ]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(
      (data) => (this.products = data),
      (error) => console.error('Failed to load products', error)
    );
  }

  deleteProduct(id: number): void {
    this.productService.delete(id).subscribe(() => this.loadProducts());
  }

  editProduct(product: Product): void {
    this.productService.update(product).subscribe(() => this.editProduct(product));
  }
}