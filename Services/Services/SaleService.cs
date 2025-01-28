namespace SalesApi.Services.Services
{
    using SalesApi.Repositories.Interfaces;
    using SalesApi.Services.Interfaces;
    using System.Collections.Generic;
    using System.Threading.Tasks;

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

        public async Task CreateSaleAsync(Sale sale)
        {
            await _saleRepository.AddAsync(sale);
        }

        public async Task UpdateSaleAsync(Sale sale)
        {
            await _saleRepository.UpdateAsync(sale);
        }

        public async Task DeleteSaleAsync(int id)
        {
            await _saleRepository.DeleteAsync(id);
        }
    }
}
