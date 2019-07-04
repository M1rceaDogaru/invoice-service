using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace InvoiceService.Controllers
{
    public class HomeController : Controller
    {
        [Route("", Order = -1)]
        [Route("{*pathInfo}", Order = 1000)]
        public async Task<ActionResult> Index(string pathInfo = "")
        {    
            return View();
        }
    }
}