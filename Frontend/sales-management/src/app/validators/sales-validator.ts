import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map } from 'rxjs/operators';
import { SaleService } from '../services/sale.service';

@Injectable({ providedIn: 'root' })
export class SalesValidator {
  constructor(private saleService: SaleService) {}

  validateSaleNumber(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return this.saleService.checkSaleNumberExists(control.value).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((exists: boolean): Observable<ValidationErrors | null> => 
          exists ? of({ saleNumberTaken: true }) : of(null)
        ),
        catchError(() => of(null))
      );
    };
  }
}
