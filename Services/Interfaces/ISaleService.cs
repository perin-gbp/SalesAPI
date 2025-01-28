using System.Collections.Generic;
using System.Threading.Tasks;

namespace SalesApi.Services.Interfaces
{

    public interface ISaleService
    {
        Task<IEnumerable<Sale>> GetAllSalesAsync();
        Task<Sale> GetSaleByIdAsync(int id);
        Task CreateSaleAsync(Sale sale);
        Task UpdateSaleAsync(Sale sale);
        Task DeleteSaleAsync(int id);
    }
}
