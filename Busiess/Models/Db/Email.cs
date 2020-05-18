using System.ComponentModel.DataAnnotations;

namespace Busiess.Models.Db
{
    public class Email
    {
        [Key]
        public int EmailId { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }
}
