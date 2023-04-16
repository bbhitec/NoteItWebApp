using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace noteit_aspnetserver.Data.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Notes",
                columns: table => new
                {
                    NoteId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Content = table.Column<string>(type: "TEXT", maxLength: 100000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notes", x => x.NoteId);
                });

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "NoteId", "Content", "Title" },
                values: new object[,]
                {
                    { 1, "This is a note 1 and Lorem ipsum...", "Note 1" },
                    { 2, "This is a note 2 and Lorem ipsum...", "Note 2" },
                    { 3, "This is a note 3 and Lorem ipsum...", "Note 3" },
                    { 4, "This is a note 4 and Lorem ipsum...", "Note 4" },
                    { 5, "This is a note 5 and Lorem ipsum...", "Note 5" },
                    { 6, "This is a note 6 and Lorem ipsum...", "Note 6" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notes");
        }
    }
}
