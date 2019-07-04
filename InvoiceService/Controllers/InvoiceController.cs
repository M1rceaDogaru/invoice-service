using InvoiceService.Models;
using Nest;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace InvoiceService.Controllers
{
    public class InvoiceController : ApiController
    {
        const string INVOICE_INDEX = "invoices";
        const int PAGE_SIZE = 10;

        private ElasticClient _client;        

        public InvoiceController()
        {
            var node = new Uri("http://127.0.0.1:9200");
            var settings = new ConnectionSettings(node);
            _client = new ElasticClient(settings);
            //companyNames = GetCompanyNames();
            //items = GetItems();
        }
        // GET: api/Invoice
        public HttpResponseMessage Get(int currentPage = 1, string sortBy = "InvoiceDate", string sortOrder = "Desc")
        {   
            var count = _client.Count<Invoice>(s => s
                .Index(INVOICE_INDEX)).Count;

            var response = _client.Search<Invoice>(s => s
                .Index(INVOICE_INDEX)
                .From((currentPage - 1) * PAGE_SIZE)
                .Size(PAGE_SIZE)
                .Sort(sort => {
                    if (sortOrder == "Asc") {
                        switch (sortBy)
                        {
                            case "InvoiceNumber":
                                return sort.Ascending(inv => inv.InvoiceNumber);
                            case "Client":
                                return sort.Ascending(inv => inv.Client);
                            case "Status":
                                return sort.Ascending(inv => inv.Status);
                            default:
                                return sort.Ascending(inv => inv.InvoiceDate);
                        }
                    }
                    else
                    {
                        switch(sortBy)
                        {
                            case "InvoiceNumber":
                                return sort.Descending(inv => inv.InvoiceNumber);
                            case "Client":
                                return sort.Descending(inv => inv.Client);
                            case "Status":
                                return sort.Descending(inv => inv.Status);
                            default:
                                return sort.Descending(inv => inv.InvoiceDate);
                        }
                    }
                })
                .Query(query => query.MatchAll()));

            return ToMessage(JsonConvert.SerializeObject(new {
                currentPage = currentPage,
                recordCount = count,
                pageSize = PAGE_SIZE,
                result = response.Documents }));            
        }

        // GET: api/Invoice/5
        public HttpResponseMessage Get(Guid id)
        {
            var response = _client.Get<Invoice>(id, idx => idx.Index(INVOICE_INDEX));
            return ToMessage(JsonConvert.SerializeObject(response.Source));
        }

        // POST: api/Invoice
        public HttpResponseMessage Post(Invoice value)
        {
            var newInvoice = value;
            newInvoice.Status = "Unpaid";
            newInvoice.Id = Guid.NewGuid();
            var response = _client.Index<Invoice>(newInvoice, idx => idx.Index(INVOICE_INDEX));
            _client.Refresh(INVOICE_INDEX);
            return ToMessage(JsonConvert.SerializeObject(newInvoice));
        }

        // PUT: api/Invoice/5
        public void Put(Guid id, Invoice value)
        {
            var response = _client.Update<Invoice, Invoice>(id, desc => desc.Index(INVOICE_INDEX).Doc(value));
            _client.Refresh(INVOICE_INDEX);
        }

        // DELETE: api/Invoice/5
        public void Delete(Guid id)
        {
            var response = _client.Delete<Invoice>(id, sel => sel.Index(INVOICE_INDEX));
            _client.Refresh(INVOICE_INDEX);
        }

        private HttpResponseMessage ToMessage(string jsonResponse)
        {
            return new HttpResponseMessage()
            {
                Content = new StringContent(jsonResponse, System.Text.Encoding.UTF8, "text/html")
            };
        }
    }
}
