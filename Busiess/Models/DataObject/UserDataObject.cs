using System;
using System.Collections.Generic;
using System.Text;

namespace Busiess.Models.DataObject
{
    public class UserDataObject
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserCode { get; set; }
        public string UserId { get; set; }
        public bool IsRegisterComplete { get; set; }
    }
}
