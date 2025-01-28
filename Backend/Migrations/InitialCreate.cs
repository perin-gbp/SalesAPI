namespace SalesApi.Migrations;

using Microsoft.EntityFrameworkCore.Migrations;

public partial class InitialCreate : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Products",
            columns: table => new
            {
                Id = table.Column<int>(nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", Npgsql.EntityFrameworkCore.PostgreSQL.Metadata.NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                Name = table.Column<string>(nullable: false),
                Price = table.Column<decimal>(nullable: false)
            },
            constraints: table => table.PrimaryKey("PK_Products", x => x.Id));

        migrationBuilder.CreateTable(
            name: "Sales",
            columns: table => new
            {
                Id = table.Column<int>(nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", Npgsql.EntityFrameworkCore.PostgreSQL.Metadata.NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                SaleNumber = table.Column<string>(nullable: false),
                SaleDate = table.Column<DateTime>(nullable: false),
                Customer = table.Column<string>(nullable: false),
                TotalAmount = table.Column<decimal>(nullable: false),
                Branch = table.Column<string>(nullable: false),
                IsCancelled = table.Column<bool>(nullable: false)
            },
            constraints: table => table.PrimaryKey("PK_Sales", x => x.Id));

        migrationBuilder.CreateTable(
            name: "SaleItems",
            columns: table => new
            {
                Id = table.Column<int>(nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", Npgsql.EntityFrameworkCore.PostgreSQL.Metadata.NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                ProductId = table.Column<int>(nullable: false),
                ProductName = table.Column<string>(nullable: false),
                Quantity = table.Column<int>(nullable: false),
                UnitPrice = table.Column<decimal>(nullable: false),
                Discount = table.Column<decimal>(nullable: false),
                TotalPrice = table.Column<decimal>(nullable: false),
                SaleId = table.Column<int>(nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_SaleItems", x => x.Id);
                table.ForeignKey(
                    name: "FK_SaleItems_Sales_SaleId",
                    column: x => x.SaleId,
                    principalTable: "Sales",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_SaleItems_SaleId",
            table: "SaleItems",
            column: "SaleId");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(name: "SaleItems");
        migrationBuilder.DropTable(name: "Sales");
        migrationBuilder.DropTable(name: "Products");
    }
}