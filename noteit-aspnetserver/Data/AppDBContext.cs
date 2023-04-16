using Microsoft.EntityFrameworkCore;

namespace noteit_aspnetserver.Data
{
    // [demo] DbContext needs EntityFrameworkCore
    // [demo] UseSqlite need Sqlite compnent within EF. those two must be the same version
    internal sealed class AppDBContext : DbContext
    {
        // [bp] we add one DB set per table
        public DbSet<Note> Notes { get; set; }


        // define path for the DB options builder result
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlite("Data Source=./Data/AppDB.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // fabricate some article instances...
            const int amnt = 6;
            Note[] notesToSeed = new Note[amnt];

            // an id '0' will have the database auto-assign an id for us (not good for updating entries)
            for (int i = 1; i <= amnt; i++)
            {
                notesToSeed[i - 1] = new Note
                {
                    NoteId = i,
                    Title = $"Note {i}",
                    Content = $"This is a note {i} and Lorem ipsum..."
                };
            }

            // ... now have EF seed the generated entries to the database
            modelBuilder.Entity<Note>().HasData(notesToSeed);
        }
    }
}