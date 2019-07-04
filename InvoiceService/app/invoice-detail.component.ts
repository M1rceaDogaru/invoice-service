    import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
	import { ActivatedRoute, Router } from '@angular/router';
    import { Invoice, Transaction } from './invoice';
	import { InvoiceService } from './invoice.service';
    import { FormatCurrencyPipe } from './currency.pipe'
    declare var $: any;
	
    @Component({
      selector: 'my-invoice-detail',
      templateUrl: 'app/invoice-detail.component.html',
	  styleUrls: ['app/invoice-detail.component.css'],
	  pipes: [FormatCurrencyPipe]
    })
	
    export class InvoiceDetailComponent implements OnInit, OnDestroy, AfterViewInit {
		  @Input() invoice: Invoice;
		  @Output() close = new EventEmitter();
		  error: any;
		  sub: any;
          navigated = false; // true if navigated here
          invoiceIsPaid = false;
		  
      constructor(
		  private invoiceService: InvoiceService,
		  private route: ActivatedRoute,
		  private router: Router) {
		}
		
		ngOnDestroy() {
		  this.sub.unsubscribe();
		}
		
		ngOnInit() {
			this.sub = this.route.params.subscribe(params => {
				if (params['id'] !== undefined) {
				  let id = params['id'];
				  this.navigated = true;
				  this.invoiceService.getInvoice(id)
					  .then(invoice => {
						  this.invoice = invoice;
                          this.calculateInvoiceAmounts();
                          this.invoiceIsPaid = this.invoice.Status === 'Paid';
					});
				} else {
				  this.navigated = false;
				  this.invoice = new Invoice();
                  this.invoice.Status = 'Draft';
                  this.invoice.Total = 0;
                  this.invoice.VatTotal = 0;
                }                
			  });
        }

        ngAfterViewInit() {
            //$('#invoiceDate').datepicker({ dateFormat: 'yy-mm-dd', timeFormat: "hh:mm:ss" });
        }
		
		save() {
		  this.invoiceService
			  .save(this.invoice)
			  .then(invoice => {
				this.invoice = invoice; // saved invoice, w/ id if new
				this.goBack(invoice);
			  })
			  .catch(error => this.error = error); // TODO: Display error message
		}
		
		goBack(savedInvoice: Invoice = null) {
		    this.close.emit(savedInvoice);
			this.router.navigate(['/invoices']);
		}
		
		addTransaction() {
			let newTransaction = new Transaction();
			newTransaction.UnitPrice = 0;
			newTransaction.Quantity = 0;
			
			this.invoice.Transactions = this.invoice.Transactions || [];
			this.invoice.Transactions.push(newTransaction);
			this.calculateInvoiceAmounts(newTransaction);
		}
		
		deleteTransaction(transaction: Transaction) {
			this.invoice.Transactions = this.invoice.Transactions.filter(trans => trans !== transaction);
			this.calculateInvoiceAmounts();
		}
		
		calculateInvoiceAmounts(transaction: Transaction = null) {
			if (transaction) {
				transaction.Vat = (transaction.UnitPrice * transaction.Quantity) * 20 / 100;
				transaction.Total = (transaction.UnitPrice * transaction.Quantity) + transaction.Vat;
			}
			
			let total = 0;
			let vatTotal = 0;
		    for (let transaction of this.invoice.Transactions) {
			    total += transaction.Total;
				vatTotal += transaction.Vat;
		    }
		    this.invoice.Total = total;
			this.invoice.VatTotal = vatTotal;
        }

        markAsPaid() {
            this.invoice.Status = "Paid";
            this.save();
        }
    }