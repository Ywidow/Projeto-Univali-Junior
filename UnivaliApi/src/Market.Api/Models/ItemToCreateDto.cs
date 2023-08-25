using Market.Api.Entities;

namespace Market.Api.Models;

public class ItemToCreateDto{
  public string Name { get; set; } = string.Empty;
  public UnitsOfMeasurement UnitOfMeasurement { get; set; }
  public int Quantity { get; set; }
  public decimal Price { get; set; }
  public bool IsPerishable { get; set; }
  public DateOnly Vality { get; set; }
  public DateOnly Fabrication { get; set; }
}