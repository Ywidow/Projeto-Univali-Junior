using AutoMapper;
using Market.Api.Contexts;
using Market.Api.Entities;
using Market.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Market.Api.Controllers;

[ApiController]
[Route("api/item")]
public class ItemController : ControllerBase{
  
  private readonly ItemContext _context;
  private readonly IMapper _mapper;

  public ItemController(ItemContext context, IMapper mapper)
  {
    _context = context ?? throw new ArgumentNullException(nameof(context));
    _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<ItemToReturnDto>>> GetAllItems(){

    var itensFromDatabase = await _context.Itens.ToListAsync();

    var itensToReturn = _mapper.Map<IEnumerable<ItemToReturnDto>>(itensFromDatabase);

    return Ok(itensToReturn);
  }

  [HttpPost]
  public async Task<ActionResult<ItemToReturnDto>> CreateItem(ItemToCreateDto itemToCreateDto){
    var itemToAddInDatabase = _mapper.Map<Item>(itemToCreateDto);
    
    await _context.AddAsync(itemToAddInDatabase);
    await _context.SaveChangesAsync();

    var itenToReturn = _mapper.Map<ItemToReturnDto>(itemToAddInDatabase);

    return Ok(itenToReturn);
  }
}