using System.ComponentModel.DataAnnotations;

namespace noteit_aspnetserver.Data
{
    // [demo] sealed directive is for preventing inheritence
    internal sealed class Note
    {
        // adding data annotation that is used to defune attribute/metadata for ASP.NET
        [Key]   // unique identification for an entity
        public int NoteId { get; set; }

        [Required]  // data field must be supplied
        [MaxLength(100)]    // limiting array/string size allowed
        public string Title { get; set; } = string.Empty;   // [demo] default init to an empty string

        [Required]
        [MaxLength(100000)]
        public string Content { get; set; } = string.Empty;
    }
}
