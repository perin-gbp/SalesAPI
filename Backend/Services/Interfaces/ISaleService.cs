using System.Collections.Generic;
using System.Threading.Tasks;
using SalesApi.Models;

namespace SalesApi.Services.Interfaces
{
    public interface ISaleService
    {
        Task<IEnumerable<Sale>> GetAllSalesAsync();
        Task<Sale> GetSaleByIdAsync(int id);
        Task<Sale> CreateSaleAsync(Sale sale);
        Task<Sale> UpdateSaleAsync(Sale sale);
        Task<bool> DeleteSaleAsync(int id);
        Task<bool> SaleNumberExists(string saleNumber);
    }
}