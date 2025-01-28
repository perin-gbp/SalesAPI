using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using SalesApi.Models;
using SalesApi.Services;
using SalesApi.Services.Interfaces;

namespace SalesApi.Controllers
{
    [Route("api/sales")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly ISaleService _saleService;

        public SaleController(ISaleService saleService)
        {
            _saleService = saleService;
        }

        /// <summary>
        /// Obtém todas as vendas.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sale>>> GetAll()
        {
            var sales = await _saleService.GetAllSalesAsync();
            return Ok(sales);
        }

        /// <summary>
        /// Obtém uma venda pelo ID.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<Sale>> GetById(int id)
        {
            var sale = await _saleService.GetSaleByIdAsync(id);
            if (sale == null)
                return NotFound();

            return Ok(sale);
        }

        /// <summary>
        /// Cria uma nova venda.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Sale>> Create([FromBody] Sale sale)
        {
            if (sale == null)
                return BadRequest("Invalid sale data.");

            var createdSale = await _saleService.CreateSaleAsync(sale);
            return CreatedAtAction(nameof(GetById), new { id = createdSale.Id }, createdSale);
        }

        /// <summary>
        /// Atualiza uma venda existente.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Sale sale)
        {
            if (sale == null || sale.Id != id)
                return BadRequest("Invalid sale data.");

            var updatedSale = await _saleService.UpdateSaleAsync(sale);
            if (updatedSale == null)
                return NotFound();

            return NoContent();
        }

        /// <summary>
        /// Exclui uma venda pelo ID.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _saleService.DeleteSaleAsync(id);
            if (!deleted)
                return NotFound();

            return NoContent();
        }

        [HttpGet("check-sale-number/{saleNumber}")]
        public async Task<IActionResult> CheckSaleNumberExists(string saleNumber)
        {
            var exists = await _saleService.SaleNumberExists(saleNumber);
            return Ok(exists);
        }
    }
}