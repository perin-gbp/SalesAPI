using Microsoft.EntityFrameworkCore;
using SalesApi.Models;
using System.Collections.Generic;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Sale> Sales { get; set; }
    public DbSet<Product> Products { get; set; }
}