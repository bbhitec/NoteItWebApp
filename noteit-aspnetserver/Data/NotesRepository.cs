using Microsoft.EntityFrameworkCore;

namespace noteit_aspnetserver.Data
{
    // web API endpoints will use this repository to perform CRUD ops on the database
    internal static class NotesRepository
    {
        // get all notes request
        // [bp] is asynchronous
        internal async static Task<List<Note>> GetNotesAsync()
        {
            // [bp] temporary scope for better garbage collection
            using (var db = new AppDBContext())
            {
                // parse database as a (task) list
                return await db.Notes.ToListAsync();
            }

        }

        // get a single note
        internal async static Task<Note> GetNoteByIdAsync(int noteId)
        {
            using (var db = new AppDBContext())
            {
                // parse database as a list
                // [demo] FirstOrDefaultAsync can return null
                return await db.Notes.FirstOrDefaultAsync(note => note.NoteId == noteId);
            }

        }

        // create operation
        internal async static Task<bool> CreateNoteAsync(Note noteToCreate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    await db.Notes.AddAsync(noteToCreate);

                    // [bp] saving the changes will return the number of saved changed entries
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    // suppress with a false rather than throwing an error
                    return false;
                    //throw;
                }
            }

        }

        // updating an entry operation
        internal async static Task<bool> UpdateNoteAsync(Note noteToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Notes.Update(noteToUpdate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }

        }

        // deleting an entry operation
        internal async static Task<bool> DeleteNoteAsync(int noteId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    Note noteToDelete = await GetNoteByIdAsync(noteId);

                    db.Remove(noteToDelete);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }

        }
    }
}
