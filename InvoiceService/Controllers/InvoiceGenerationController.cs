using InvoiceService.Models;
using Nest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace InvoiceService.Controllers
{
    public class InvoiceGenerationController : ApiController
    {
        const string INVOICE_INDEX = "invoices";

        private Random _gen = new Random();
        private string[] companyNames;
        private string[] items;
        private ElasticClient _client;

        public InvoiceGenerationController()
        {
            var node = new Uri("http://127.0.0.1:9200");
            var settings = new ConnectionSettings(node);
            _client = new ElasticClient(settings);

            companyNames = GetCompanyNames();
            items = GetItems();
        }

        // GET: api/InvoiceGeneration/5
        public string Get(int id)
        {
            // This is not how you would normally use a web api get endpoint
            GenerateInvoices(id);
            return "Generated " + id;
        }        

        private void GenerateInvoices(int numberOfInvoices)
        {
            var invoicesToAdd = new List<Invoice>();
            for (var i = 0; i < numberOfInvoices; i++)
            {
                var invoice = new Invoice()
                {
                    Id = Guid.NewGuid(),
                    InvoiceNumber = "INV" + i.ToString("0000"),
                    InvoiceDate = RandomDay(),
                    Client = RandomClient(),
                    Status = RandomStatus()
                };

                var numberOfTransactions = _gen.Next(1, 3);
                invoice.Transactions = new Transaction[numberOfTransactions];

                for (int j = 0; j < numberOfTransactions; j++)
                {
                    var transaction = new Transaction()
                    {
                        Description = RandomItem(),
                        UnitPrice = RandomAmount(),
                        Quantity = RandomQuantity()
                    };

                    transaction.Vat = (transaction.UnitPrice * (Decimal)transaction.Quantity) * 20 / 100;
                    transaction.Total = (transaction.UnitPrice * (Decimal)transaction.Quantity) + transaction.Vat;

                    invoice.Transactions[j] = transaction;
                }

                invoice.VatTotal = invoice.Transactions.Sum(trans => trans.Vat);
                invoice.Total = invoice.Transactions.Sum(trans => trans.Total);

                invoicesToAdd.Add(invoice);
            }

            var deleteResponse = _client.DeleteIndex(INVOICE_INDEX);
            var bulkResponse = _client.Bulk(bulk => bulk.CreateMany<Invoice>(invoicesToAdd,
                (bulkSelector, bulkOperation) => bulkSelector.Index(INVOICE_INDEX)));
        }

        private DateTime RandomDay()
        {
            DateTime start = new DateTime(2015, 1, 1);
            int range = (DateTime.Today - start).Days;
            return start.AddDays(_gen.Next(range));
        }

        private string RandomClient()
        {
            int range = companyNames.Length;
            return companyNames[_gen.Next(range)];
        }

        private string RandomItem()
        {
            int range = items.Length;
            return items[_gen.Next(range)];
        }

        private string RandomStatus()
        {
            return new string[3] { "Draft", "Unpaid", "Paid" }[_gen.Next(3)];
        }

        private decimal RandomAmount()
        {
            return _gen.Next(100, 1000);
        }

        private double RandomQuantity()
        {
            return _gen.Next(1, 25);
        }

        private string[] GetCompanyNames()
        {
            return new List<string>()
            {
                "Elcan Ltd.",
                "Neovision Software Solutions Ltd.",
                "Dextopia Ltd.",
                "Lars Limited",
                "Proverbia Exo",
                "Amazon Ltd.",
                "Grece Convoluta Pty.",
                "Sarge International"
            }.ToArray();
        }

        private string[] GetItems()
        {
            return new List<string>()
            {
                "Laptop",
                "Windows 10 Professional license",
                "Office 365 subscription",
                "Dell Optiplex workstation",
                "Norton Antivirus 2016 license",
                "Samsung 24 inch screen",
                "Logitech keyboard",
                "Logitech mouse"
            }.ToArray();
        }
    }
}
