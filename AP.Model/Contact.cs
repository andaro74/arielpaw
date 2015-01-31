using ObjectInterfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace AP.Model
{
    public partial class Contact
    {
         public int Id { get; set; }
         public int AppId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
         public string Email { get; set; }
          public string MobilePhoneNumber { get; set; }
    }
}
