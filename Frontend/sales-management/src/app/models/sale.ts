export interface Sale {
    id: number;
    saleNumber: string;
    saleDate: string;
    customer: string;
    totalAmount: number;
    branch: string;
    isCancelled: boolean;
    items: SaleItem[];
  }
  
  export interface SaleItem {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    totalPrice: number;
  }