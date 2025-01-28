import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, catchError, map } from 'rxjs/operators';
import { SaleService } from '../services/sale.service';

@Injectable({ providedIn: 'root' })
export class SalesValidator {
  constructor(private saleService: SaleService) {}

  validateSaleNumber(currentSaleNumber?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value || control.value === currentSaleNumber) {
        return of(null); // ✅ Se o número da venda não mudou, não valida
      }

      return this.saleService.checkSaleNumberExists(control.value).pipe(
        debounceTime(500), // ✅ Evita múltiplas requisições enquanto o usuário digita
        switchMap((exists: boolean) => exists ? of({ saleNumberTaken: true }) : of(null)),
        catchError(() => of(null)) // ✅ Se a API falhar, não bloquear a edição
      );
    };
  }
}