using Market.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Market.Api.Contexts;

public class ItemContext : DbContext{
  public DbSet<Item> Itens { get; set; }

  public ItemContext(DbContextOptions<ItemContext> options) :  base(options) { }

  protected override void OnModelCreating(ModelBuilder modelBuilder){
    var item = modelBuilder.Entity<Item>();

    item
      .Property(item => item.Name)
      .HasMaxLength(50)
      .IsRequired();

    item
      .Property(item => item.UnitOfMeasurement)
      .IsRequired();

    item
      .Property(item => item.Price)
      .IsRequired();

    item
      .Property(item => item.IsPerishable)
      .IsRequired();

    item
      .Property(item => item.Fabrication)
      .IsRequired();

    item 
      .HasData(
        new Item{
          Id = 1,
          Name = "ToothPaste",
          UnitOfMeasurement = UnitsOfMeasurement.Unity,
          Quantity = 2,
          Price = 2.5M,
          IsPerishable = false,
          Vality = new DateOnly(2023, 8, 22),
          Fabrication = new DateOnly(2023, 8, 22)
        },
        new Item{
          Id = 2,
          Name = "Shampoo",
          UnitOfMeasurement = UnitsOfMeasurement.Liters,
          Quantity = 8,
          Price = 4.5M,
          IsPerishable = false,
          Vality = new DateOnly(2023, 8, 29),
          Fabrication = new DateOnly(2023, 8, 21)
        }
      );

    base.OnModelCreating(modelBuilder);
  }
}