using AutoMapper;
using Market.Api.Entities;
using Market.Api.Models;

namespace Market.Api.Profiles;

public class ItemProfile : Profile{
  public ItemProfile(){
    CreateMap<Item, ItemToReturnDto>();
    CreateMap<ItemToCreateDto, Item>();
  }
}