using SalesApi.Models;
using System;
using System.Collections.Generic;

public class Sale
{
    public int Id { get; set; }
    public string SaleNumber { get; set; }
    public DateTime SaleDate { get; set; }
    public string Customer { get; set; }
    public decimal TotalAmount { get; set; }
    public string Branch { get; set; }
    public bool IsCancelled { get; set; }
    public ICollection<SaleItem> Items { get; set; }
}