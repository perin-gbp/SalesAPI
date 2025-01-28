import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { SaleService } from '../../services/sale.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SaleItemFormComponent } from '../sale-item-form/sale-item-form.component';
import { CommonModule} from '@angular/common'
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
    private route: ActivatedRoute
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
    this.saleForm = this.fb.group({
        saleNumber: ['', [Validators.required], [this.salesValidator.validateSaleNumber()]], // ✅ Correto
        saleDate: ['', Validators.required],
        customer: ['', Validators.required],
        items: this.fb.array([])
      });
    
    this.productService.getAll().subscribe({
        next: (products) => {
          this.products = products;
          console.log("Produtos carregados:", this.products);
        }});



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

        this.saleForm.get('saleNumber')?.clearAsyncValidators();

        this.saleForm.patchValue({
          saleNumber: sale.saleNumber,
          branch: sale.branch,
          saleDate: new Date(sale.saleDate).toISOString().split('T')[0],
          customer: sale.customer
        });

        this.saleForm.get('saleNumber')?.valueChanges.subscribe(value => {
            this.saleForm.get('saleNumber')?.setAsyncValidators([this.salesValidator.validateSaleNumber(sale.saleNumber)])
            this.saleForm.get('saleNumber')?.updateValueAndValidity();
          });
          
        this.items.clear();

        sale.items.forEach(item => {
          const selectedProduct = this.products.find(p => p.id === item.productId);
          this.items.push(this.fb.group({
            productId: [item.productId, Validators.required],
            quantity: [item.quantity, [Validators.required, Validators.min(1), Validators.max(20)]],
            unitPrice: [selectedProduct ? selectedProduct.price : item.unitPrice,, [Validators.required, Validators.min(0.01)]]
          }));
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
      productId: ['', Validators.required], // ID do Produto
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
      const productSale = this.saleForm.value;
      productSale.id = id;
      if (this.isEditMode && this.saleId) {
        this.saleService.update(productSale).subscribe(() => {
          this.router.navigate(['/sales']);
        });
      } else {
        this.saleService.create(productSale).subscribe(() => {
          this.router.navigate(['/sales']);
        });
      }
    }
  }

  
}