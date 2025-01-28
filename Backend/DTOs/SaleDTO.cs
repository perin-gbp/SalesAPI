namespace SalesApi.DTOs
{
    public class SaleDTO
    {
        public int Id { get; set; }
        public string SaleNumber { get; set; }
        public DateTime SaleDate { get; set; }
        public string Customer { get; set; }
        public string Branch { get; set; }
        public List<SaleItemDTO> Items { get; set; }
    }
}
