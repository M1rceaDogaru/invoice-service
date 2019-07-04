    import { Component, OnInit } from '@angular/core';
	import { Router } from '@angular/router';
    import { Invoice } from './invoice';
    import { InvoiceDetailComponent } from './invoice-detail.component';
    import { InvoiceService } from './invoice.service';
    import { FormatCurrencyPipe } from './currency.pipe';
    import { ComputePagesPipe } from './paging.pipe';
    
    @Component({
      selector: 'my-invoices',
      templateUrl: 'app/invoices.component.html',
      styleUrls: ['app/invoices.component.css'],
      directives: [InvoiceDetailComponent],
      pipes: [FormatCurrencyPipe, ComputePagesPipe]
    })
	
    export class InvoicesComponent implements OnInit {
		title = 'My invoices';
		invoices: Invoice[];
		selectedInvoice: Invoice;
        error: any;
        currentPage: number;
        recordCount: number;
        pageSize: number;
        sortBy: string;
        sortOrder: string;
	  
        constructor(private router: Router, private invoiceService: InvoiceService) {
            this.currentPage = 1;
            this.recordCount = 0;
            this.pageSize = 10;
            this.sortBy = "InvoiceDate";
            this.sortOrder = "Desc";
        }
	  		
		getInvoices() {
            this.invoiceService.getInvoices(this.currentPage, this.sortBy, this.sortOrder).then(invoices => {
                this.invoices = invoices.result as Invoice[];
                this.currentPage = +invoices.currentPage;
                this.pageSize = +invoices.pageSize;
                this.recordCount = +invoices.recordCount;
            });
		}
		
		ngOnInit() {
			this.getInvoices();
		}
		  
		onSelect(invoice: Invoice) { 
			this.selectedInvoice = invoice; 
			this.gotoDetail();
		}
	    
		gotoDetail() {
			this.router.navigate(['/invoice', this.selectedInvoice.Id]);
		}
		
		addInvoice() {		  
		  this.selectedInvoice = null;
		  this.router.navigate(['/invoice']);
		}

		close() {
		  this.getInvoices();
		}
		
		deleteInvoice(invoice: Invoice, event: any) {
		  event.stopPropagation();
		  this.invoiceService
			  .delete(invoice)
			  .then(() => {
                  this.getInvoices();
			  })
			  .catch(error => this.error = error);
        }

        changePage(event) {
            this.currentPage = +event.target.value;
            this.getInvoices();
        }

        sortPage(sortBy: string) {
            if (sortBy == this.sortBy) {
                this.sortOrder = (this.sortOrder === "Asc" ? "Desc" : "Asc");
            } else {
                this.sortBy = sortBy;
            }

            this.getInvoices();
        }
    }