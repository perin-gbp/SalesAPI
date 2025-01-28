using SalesApi.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class Sale
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string SaleNumber { get; set; }

    private DateTime _saleDate;
    public DateTime SaleDate
    {
        get => _saleDate;
        set => _saleDate = DateTime.SpecifyKind(value, DateTimeKind.Utc);
    }
    public string Customer { get; set; }
    public decimal TotalAmount { get; set; }
    public string Branch { get; set; }
    public List<SaleItem> Items { get; set; } = new List<SaleItem>();
    public bool IsCancelled { get; set; }
}