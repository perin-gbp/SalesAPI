﻿using System.Collections.Generic;
using System.Threading.Tasks;
using SalesApi.Repositories.Interfaces;
using SalesApi.Services.Interfaces;
using SalesApi.Models;
using SalesApi.Repositories;

namespace SalesApi.Services.Services
{
    public class SaleService : ISaleService
    {
        private readonly ISaleRepository _saleRepository;

        public SaleService(ISaleRepository saleRepository)
        {
            _saleRepository = saleRepository;
        }

        public async Task<IEnumerable<Sale>> GetAllSalesAsync()
        {
            return await _saleRepository.GetAllAsync();
        }

        public async Task<Sale> GetSaleByIdAsync(int id)
        {
            return await _saleRepository.GetByIdAsync(id);
        }

        public async Task<Sale> CreateSaleAsync(Sale sale)
        {
            if (sale == null || sale.Items == null || !sale.Items.Any())
                throw new ArgumentException("A sale must have at least one item.");

            ApplyBusinessRules(sale);

            return await _saleRepository.CreateAsync(sale);
        }

        public async Task<Sale> UpdateSaleAsync(Sale sale)
        {
            if (sale == null || sale.Items == null || !sale.Items.Any())
                throw new ArgumentException("A sale must have at least one item.");

            ApplyBusinessRules(sale);

            return await _saleRepository.UpdateAsync(sale);
        }

        public async Task<bool> DeleteSaleAsync(int id)
        {
            return await _saleRepository.DeleteAsync(id);
        }

        public async Task<bool> SaleNumberExists(string saleNumber)
        {
            return await _saleRepository.SaleNumberExists(saleNumber);
        }

        private void ApplyBusinessRules(Sale sale)
        {
            decimal totalSaleAmount = 0;

            foreach (var item in sale.Items)
            {
                if (item.Quantity > 20)
                    throw new InvalidOperationException($"Item '{item.ProductName}' cannot have more than 20 units per sale.");

                decimal discount = 0;

                if (item.Quantity >= 4 && item.Quantity < 10)
                    discount = 0.10m;
                else if (item.Quantity >= 10 && item.Quantity <= 20)
                    discount = 0.20m;

                item.TotalPrice = item.Quantity * item.UnitPrice * (1 - discount);
                totalSaleAmount += item.TotalPrice;
            }

            sale.TotalAmount = totalSaleAmount;
        }
    }
}