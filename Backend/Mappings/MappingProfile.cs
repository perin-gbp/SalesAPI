using AutoMapper;
using SalesApi.DTOs;
using SalesApi.Models;

namespace SalesApi.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Mapeamentos entre Entidades e DTOs
            CreateMap<Sale, SaleResponseDTO>();
            CreateMap<SaleItem, SaleItemResponseDTO>();
            CreateMap<SaleDTO, Sale>();
            CreateMap<SaleItemDTO, SaleItem>();
            CreateMap<ProductDTO, Product>();
        }
    }
}
