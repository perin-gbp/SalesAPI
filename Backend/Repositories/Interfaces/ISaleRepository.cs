using System.Collections.Generic;
using System.Threading.Tasks;
using SalesApi.Models;

namespace SalesApi.Repositories.Interfaces
{
    public interface ISaleRepository
    {
        Task<IEnumerable<Sale>> GetAllAsync();
        Task<Sale> GetByIdAsync(int id);
        Task<Sale> CreateAsync(Sale sale);
        Task<Sale> UpdateAsync(Sale sale);
        Task<bool> DeleteAsync(int id);
        Task<bool> SaleNumberExists(string saleNumber);
    }
}