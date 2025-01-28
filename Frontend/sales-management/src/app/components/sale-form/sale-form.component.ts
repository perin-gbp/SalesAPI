import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { SaleService } from '../../services/sale.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SaleItemFormComponent } from '../sale-item-form/sale-item-form.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { SalesValidator } from '../../validators/sales-validator';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  standalone: true,
  imports: [SaleItemFormComponent, ReactiveFormsModule, CommonModule]
})
export class SaleFormComponent {
  saleForm: FormGroup;
  isEditMode = false;
  saleId: number | null = null;
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private saleService: SaleService,
    private salesValidator: SalesValidator,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.saleForm = this.fb.group({
      saleNumber: ['', [Validators.required], [this.salesValidator.validateSaleNumber()]],
      saleDate: ['', Validators.required],
      branch: ['', Validators.required],
      customer: ['', Validators.required],
      items: this.fb.array<FormGroup>([])
    });
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        console.log("✅ Produtos carregados:", this.products);
      }
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.saleId = +params['id'];  
        this.loadSale(this.saleId);
      }
    });
  }

  loadSale(id: number): void {
    this.saleService.getById(id).subscribe({
      next: (sale) => {
        console.log("📌 Venda carregada:", sale);
  
        this.saleForm.patchValue({
          saleNumber: sale.saleNumber,
          branch: sale.branch,
          saleDate: new Date(sale.saleDate).toISOString().split('T')[0],
          customer: sale.customer
        });
  
        // 🔹 Limpa os itens antigos antes de adicionar os novos
        while (this.items.length !== 0) {
          this.items.removeAt(0);
        }
  
        this.productService.getAll().subscribe({
          next: (products) => {
            this.products = products;
            console.log("✅ Produtos carregados:", this.products);
  
            sale.items.forEach((item) => {
              console.log("🔍 Item carregado:", item);
  
              const selectedProduct = this.products.find(p => p.id === item.productId);
              console.log("🔍 Produto correspondente ao nome encontrado:", selectedProduct);
  
              const newItem = this.fb.group({
                productId: [selectedProduct ? selectedProduct.id : item.productId, Validators.required],
                productName: [item.productName, Validators.required],
                quantity: [item.quantity, [Validators.required, Validators.min(1), Validators.max(20)]],
                unitPrice: [selectedProduct ? selectedProduct.price : item.unitPrice, [Validators.required, Validators.min(0.01)]]
              });
  
              this.items.push(newItem);
            });
  
            setTimeout(() => {
              this.cdr.detectChanges();
            }, 50);
  
            console.log("✅ Itens da venda configurados corretamente:", this.items.value);
          },
          error: (err) => {
            console.error("❌ Erro ao carregar produtos:", err);
          }
        });
      },
      error: (err) => {
        console.error("❌ Erro ao carregar venda:", err);
      }
    });
  }
  
  
  get items(): FormArray<FormGroup> {
    return this.saleForm.get('items') as FormArray<FormGroup>;
  }

  addItem(): void {
    this.items.push(this.fb.group({
      productId: ['', Validators.required],
      productName: [''],
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
      unitPrice: [0, [Validators.required, Validators.min(0.01)]]
    }));
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onSubmit(id: number): void {
    if (this.saleForm.valid) {
      const saleData = { 
        ...this.saleForm.value,
        id: this.isEditMode ? this.saleId : 0, // 🔹 Define ID 0 para novas vendas
        items: this.items.value.map((item: any) => ({
          ...item,
          id: this.isEditMode ? item.id : 0 // 🔹 Garante que novos itens tenham ID 0
        }))
      };
  
      console.log("📌 JSON antes do envio:", JSON.stringify(saleData, null, 2));
  
      if (this.isEditMode && this.saleId) {
        this.saleService.update(saleData, this.saleId).subscribe({
          next: () => {
            console.log("✅ Venda atualizada com sucesso!");
            this.router.navigate(['/sales']);
          },
          error: (err) => {
            console.error("❌ Erro ao atualizar venda:", err);
          }
        });
      } else {
        this.saleService.create(saleData).subscribe({
          next: () => {
            console.log("✅ Venda criada com sucesso!");
            this.router.navigate(['/sales']);
          },
          error: (err) => {
            console.error("❌ Erro ao criar venda:", err);
          }
        });
      }
    } else {
      console.error("❌ Formulário inválido:", this.saleForm.value);
    }
  }
}
