import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as productService from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports:[
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: productService.ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id'];
        this.loadProduct(this.productId);
      }
    });
  }

  loadProduct(id: number): void {
    this.productService.getById(id).subscribe((product) => {
      this.productForm.patchValue(product);
    });
  }

  onSubmit(id: number): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      if (this.isEditMode && this.productId) {
        this.productService.update(productData).subscribe(() => {
          this.router.navigate(['/products']);
        });
      } else {
        this.productService.create(productData).subscribe(() => {
          this.router.navigate(['/products']);
        });
      }
    }
  }
}
