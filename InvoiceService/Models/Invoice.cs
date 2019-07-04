using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InvoiceService.Models
{
    public class Invoice
    {
        public Guid Id { get; set; }
        public string InvoiceNumber { get; set; }
        public string Client { get; set; }
        
        public DateTime InvoiceDate { get; set; }
        public string Status { get; set; }
        public IList<Transaction> Transactions { get; set; }
        public decimal Total { get; set; }
        public decimal VatTotal { get; set; }
    }
}