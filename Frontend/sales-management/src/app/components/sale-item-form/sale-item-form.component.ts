import { Component, Input, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sale-item-form',
  templateUrl: './sale-item-form.component.html',
  standalone: true,
  imports: [CommonModule]
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
  
    if (!this.products || this.products.length === 0) {
      this.productService.getAll().subscribe((data) => {
        this.products = data;
        this.setInitialProduct();
        this.cdr.detectChanges();
      });
    } else {
      this.setInitialProduct();
    }
  }
  
  setInitialProduct(): void {
    let productId = this.saleItemForm.get('productId')?.value;
    let quantity = this.saleItemForm.get('quantity')?.value;
  
    if (!productId || productId === null) {
      const productName = this.saleItemForm.get('productName')?.value;
      const selectedProduct = this.products.find(p => p.name === productName);
  
      if (selectedProduct) {
        this.saleItemForm.patchValue({
          productId: selectedProduct.id,
          quantity: quantity || 1
        });
      } else {
        console.warn("⚠️ Nenhum productId encontrado, mantendo valor original.");
      }
    }
  
    this.cdr.detectChanges();
  }
  

  get unitPriceValue(): number {
    return this.saleItemForm.get('unitPrice')?.value || 0;
  }

  setInitialPrice(): void {
    const productId = this.saleItemForm.get('id')?.value;
  
    if (!productId) {
      console.warn("⚠️ Nenhum productId encontrado no saleItemForm!");
      return;
    }
  
    const selectedProduct = this.products.find(p => p.id === productId);
  
    if (selectedProduct) {
      this.saleItemForm.patchValue({ 
        unitPrice: selectedProduct.price, 
        productName: selectedProduct.name,
        quantity: selectedProduct.quantity
      });
  
      this.cdr.detectChanges(); // 🔹 Garante que o Angular detecte a mudança
    } else {
      console.warn("⚠️ Produto correspondente ao productId não encontrado!");
    }
  }

  onQuantityChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement | null;

    if (!inputElement) {
        console.error("❌ Erro: inputElement é null!");
        return;
    }

    const quantity = Number(inputElement.value);

    if (!this.saleItemForm) return;

    this.saleItemForm.patchValue({
        quantity: quantity
    });

    this.cdr.detectChanges();
  }

  onProductChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedProductId = Number(selectElement.value);
  
    if (!this.products || isNaN(selectedProductId)) return;
  
    const selectedProduct = this.products.find(p => p.id === selectedProductId);
  
    if (selectedProduct && this.saleItemForm) {
      this.saleItemForm.patchValue({
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        quantity: selectedProduct.quantity,
        unitPrice: selectedProduct.price
      });
  
      this.cdr.detectChanges(); // ✅ Força a UI a atualizar
    }
  }
}
