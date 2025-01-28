﻿namespace SalesApi.Models
{
    public class SaleItem
    {
        public int Id { get; set; }
        public int SaleId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
