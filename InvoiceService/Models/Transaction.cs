using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InvoiceService.Models
{
    public class Transaction
    {
        public string Description { get; set; }
        public decimal UnitPrice { get; set; }
        public double Quantity { get; set; }
        public decimal Vat { get; set; }
        public decimal Total { get; set; }
    }
}