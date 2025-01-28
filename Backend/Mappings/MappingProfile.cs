using AutoMapper;
using SalesApi.DTOs;
using SalesApi.Models;

namespace SalesApi.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Sale, SaleResponseDTO>();
            CreateMap<SaleItem, SaleItemResponseDTO>();
            CreateMap<SaleDTO, Sale>();
            CreateMap<SaleItemDTO, SaleItem>();
            CreateMap<ProductDTO, Product>();
        }
    }
}
