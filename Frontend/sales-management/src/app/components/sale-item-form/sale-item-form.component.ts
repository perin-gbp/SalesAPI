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
  @Input() saleItemForm!: FormGroup; // ✅ Cada item recebe um FormGroup individual
  @Output() remove = new EventEmitter<void>();
  @Input() products: Product[] = []; // ✅ Recebendo os produtos corretamente

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  onRemove(): void {
    this.remove.emit();
  }

  ngOnInit(): void {
    console.log("📌 Formulário do item recebido:", this.saleItemForm.value);
  
    if (!this.products || this.products.length === 0) {
      this.productService.getAll().subscribe((data) => {
        this.products = data;
        console.log("✅ Produtos carregados no sale-item-form:", this.products);
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
    console.log("🔍 Verificando valores iniciais - productId:", productId, " | quantity:", quantity);
  
    if (!productId || productId === null) {
      const productName = this.saleItemForm.get('productName')?.value;
      const selectedProduct = this.products.find(p => p.name === productName);
      console.log("🔍 Produto inicial encontrado pelo nome:", selectedProduct);
  
      if (selectedProduct) {
        this.saleItemForm.patchValue({
          productId: selectedProduct.id,
          quantity: quantity || 1 // ✅ Se a quantidade for undefined, define como 1
        });
  
        console.log("✅ ProductId atualizado:", selectedProduct.id);
      } else {
        console.warn("⚠️ Nenhum productId encontrado, mantendo valor original.");
      }
    }
  
    this.cdr.detectChanges(); // 🔹 Garante que a UI seja atualizada
  }
  

  get unitPriceValue(): number {
    return this.saleItemForm.get('unitPrice')?.value || 0;
  }

  setInitialPrice(): void {
    const productId = this.saleItemForm.get('id')?.value;
    console.log("🔍 Verificando productId inicial:", productId);
  
    if (!productId) {
      console.warn("⚠️ Nenhum productId encontrado no saleItemForm!");
      return;
    }
  
    const selectedProduct = this.products.find(p => p.id === productId);
    console.log("🔍 Produto inicial encontrado:", selectedProduct);
  
    if (selectedProduct) {
      this.saleItemForm.patchValue({ 
        unitPrice: selectedProduct.price, 
        productName: selectedProduct.name 
      });
  
      console.log("✅ Preço inicial atualizado:", selectedProduct.price);
      console.log("✅ Produto inicial selecionado:", selectedProduct.name);
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

    console.log("📌 Quantidade alterada:", quantity);

    if (!this.saleItemForm) return;

    this.saleItemForm.patchValue({
        quantity: quantity
    });

    this.cdr.detectChanges();
  }

  onProductChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedProductId = Number(selectElement.value);
  
    console.log("🔍 Produto selecionado ID:", selectedProductId);
  
    if (!this.products || isNaN(selectedProductId)) return;
  
    const selectedProduct = this.products.find(p => p.id === selectedProductId);
    console.log("🔍 Produto encontrado:", selectedProduct);
  
    if (selectedProduct && this.saleItemForm) {
      this.saleItemForm.patchValue({
        productId: selectedProduct.id,
        productName: selectedProduct.name, // ✅ Agora garantimos que productName é atualizado corretamente
        unitPrice: selectedProduct.price
      });
  
      console.log("✅ Preço atualizado para:", selectedProduct.price);
      console.log("✅ Produto atualizado para:", selectedProduct.name);
      console.log("📌 Estado atual do FormGroup:", this.saleItemForm.value);
  
      this.cdr.detectChanges(); // ✅ Força a UI a atualizar
    }
  }
}
