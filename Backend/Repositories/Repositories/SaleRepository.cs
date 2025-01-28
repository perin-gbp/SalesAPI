using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SalesApi.Repositories.Interfaces;
using SalesApi.Data;
using SalesApi.Models;

namespace SalesApi.Repositories.Repositories
{
    public class SaleRepository : ISaleRepository
    {
        private readonly ApplicationDbContext _context;

        public SaleRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Sale>> GetAllAsync()
        {
            return await _context.Sales.OrderBy(x => x.Id).Include(s => s.Items).ToListAsync();
        }

        public async Task<Sale> GetByIdAsync(int id)
        {
            return await _context.Sales.Include(s => s.Items).FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Sale> CreateAsync(Sale sale)
        {
            _context.Sales.Add(sale);
            await _context.SaveChangesAsync();
            return sale;
        }

        public async Task<Sale?> UpdateAsync(Sale sale)
        {
            var existingSale = await _context.Sales
                .Include(s => s.Items)
                .FirstOrDefaultAsync(s => s.Id == sale.Id);

            if (existingSale == null)
                return null;


            var itemsToRemove = existingSale.Items
                .Where(item => item.Id != 0)
                .ToList();

            _context.SaleItems.RemoveRange(itemsToRemove);


            existingSale.SaleNumber = sale.SaleNumber;
            existingSale.SaleDate = sale.SaleDate;
            existingSale.Customer = sale.Customer;
            existingSale.Branch = sale.Branch;
            existingSale.Items = sale.Items.Select(item => new SaleItem
            {
                ProductId = item.ProductId,
                ProductName = item.ProductName,
                Quantity = item.Quantity,
                UnitPrice = item.UnitPrice,
                TotalPrice = item.TotalPrice
            }).ToList();

            await _context.SaveChangesAsync();
            return existingSale;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var sale = await _context.Sales.FindAsync(id);
            if (sale == null)
                return false;

            _context.Sales.Remove(sale);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> SaleNumberExists(string saleNumber)
        {
            return await _context.Sales.AnyAsync(s => s.Id.ToString() == saleNumber);
        }
    }
}