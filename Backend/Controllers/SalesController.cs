namespace SalesApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class SalesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SalesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_context.Sales.Include(s => s.Items).ToList());
    }

    [HttpPost]
    public IActionResult Create(Sale sale)
    {
        if (sale.Items.Any(i => i.Quantity > 20))
        {
            return BadRequest("Cannot sell more than 20 identical items.");
        }

        foreach (var item in sale.Items)
        {
            if (item.Quantity >= 4 && item.Quantity < 10)
            {
                item.Discount = 0.10m * item.UnitPrice * item.Quantity;
                item.TotalPrice = (item.UnitPrice * item.Quantity) - item.Discount;
            }
            else if (item.Quantity >= 10)
            {
                item.Discount = 0.20m * item.UnitPrice * item.Quantity;
                item.TotalPrice = (item.UnitPrice * item.Quantity) - item.Discount;
            }
        }

        sale.TotalAmount = sale.Items.Sum(i => i.TotalPrice);
        _context.Sales.Add(sale);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetAll), new { id = sale.Id }, sale);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Sale sale)
    {
        var existingSale = _context.Sales.Include(s => s.Items).FirstOrDefault(s => s.Id == id);
        if (existingSale == null)
        {
            return NotFound();
        }

        existingSale.IsCancelled = sale.IsCancelled;
        _context.SaveChanges();

        return NoContent();
    }
}

