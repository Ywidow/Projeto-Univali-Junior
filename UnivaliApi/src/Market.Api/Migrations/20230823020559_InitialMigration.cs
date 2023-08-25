using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Market.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Itens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    UnitOfMeasurement = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    IsPerishable = table.Column<bool>(type: "boolean", nullable: false),
                    Vality = table.Column<DateOnly>(type: "date", nullable: false),
                    Fabrication = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Itens", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Itens",
                columns: new[] { "Id", "Fabrication", "IsPerishable", "Name", "Price", "Quantity", "UnitOfMeasurement", "Vality" },
                values: new object[,]
                {
                    { 1, new DateOnly(2023, 8, 22), false, "ToothPaste", 2.5m, 2, 2, new DateOnly(2023, 8, 22) },
                    { 2, new DateOnly(2023, 8, 21), false, "Shampoo", 4.5m, 8, 0, new DateOnly(2023, 8, 29) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Itens");
        }
    }
}
