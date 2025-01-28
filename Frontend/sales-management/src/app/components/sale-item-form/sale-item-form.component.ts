import { Component, Input, OnInit, ChangeDetectorRef, Output, EventEmitter  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-sale-item-form',
  templateUrl: './sale-item-form.component.html',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class SaleItemFormComponent implements OnInit {
  @Input() saleItemForm!: FormGroup;
  @Output() remove = new EventEmitter<void>();
  @Input() products: Product[] = [];

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}
  onRemove(): void {
    this.remove.emit();
  }
  
  ngOnInit(): void {
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  get unitPriceValue(): number {
    return this.saleItemForm.get('unitPrice')?.value || 0;
  }

  onProductChange(event: any): void {
    const selectedProductId = +event.target.value;
    console.log("🔍 Produto selecionado ID:", selectedProductId);
  
    const selectedProduct = this.products.find(p => p.id === selectedProductId);
    console.log("🔍 Produto encontrado:", selectedProduct);
  
    if (selectedProduct) {
      this.saleItemForm.patchValue({
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        unitPrice: selectedProduct.price
      });
  
      console.log("✅ Preço atualizado para:", selectedProduct.price);
      console.log("📌 Estado atual do FormGroup:", this.saleItemForm.value);

      this.cdr.detectChanges();
    }
  }
}