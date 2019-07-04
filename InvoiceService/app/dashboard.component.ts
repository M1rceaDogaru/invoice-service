import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from './invoice';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})

export class DashboardComponent implements OnInit {
	  invoices: Invoice[] = [];
	  constructor(
		private router: Router,
		private invoiceService: InvoiceService) { }
		
	  ngOnInit() {
		this.invoiceService.getInvoices()
		  .then(invoices => this.invoices = (invoices.result as Invoice[]).slice(0, 3));
	  }
	  
	  gotoDetail(invoice: Invoice) { 
		let link = ['/invoice', invoice.Id];
		this.router.navigate(link);
	  }
}