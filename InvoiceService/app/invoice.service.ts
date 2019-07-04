    import { Injectable } from '@angular/core';
	import { Headers, Http } from '@angular/http';
	import 'rxjs/add/operator/toPromise';
	
    import { Invoice } from './invoice';
	
    @Injectable()
    export class InvoiceService {
		private invoicesUrl = 'api/invoice';  // URL to web api

        constructor(private http: Http) { }

        getInvoices(currentPage: number = 1, sortBy: string = "InvoiceDate", sortOrder: string = "Desc") {
            let url = `${this.invoicesUrl}?currentPage=${currentPage}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

            return this.http.get(url)
				       .toPromise()
				       .then(response => response.json())
				       .catch(this.handleError);
	    }
	  
      getInvoice(id: string) {
          let url = `${this.invoicesUrl}/${id}`;

          return this.http.get(url)
              .toPromise()
              .then(response => response.json() as Invoice)
              .catch(this.handleError);
	  }
	  
	  save(invoice: Invoice): Promise<Invoice>  {
		  if (invoice.Id) {
			return this.put(invoice);
		  }
		  return this.post(invoice);
	  }
	  
	  private handleError(error: any) {
          // In a real world app, we might use a remote logging infrastructure
          // We'd also dig deeper into the error to get a better message
          let errMsg = (error.message) ? error.message :
              error.status ? `${error.status} - ${error.statusText}` : 'Server error';
          console.error(errMsg); // log to console instead
          return Promise.reject(errMsg);		
	  }
	  
	  // Add new invoice
		private post(invoice: Invoice): Promise<Invoice> {
		  let headers = new Headers({
			'Content-Type': 'application/json'});

		  return this.http
                     .post(this.invoicesUrl, JSON.stringify(invoice), {headers: headers})
					 .toPromise()
					 .then(res => res.json())
					 .catch(this.handleError);
		}
		
		// Update existing invoice
		private put(invoice: Invoice) {
		  let headers = new Headers();
		  headers.append('Content-Type', 'application/json');

		  let url = `${this.invoicesUrl}/${invoice.Id}`;

		  return this.http
					 .put(url, JSON.stringify(invoice), {headers: headers})
					 .toPromise()
					 .then(() => invoice)
					 .catch(this.handleError);
		}
		
		delete(invoice: Invoice) {
		  let headers = new Headers();
		  headers.append('Content-Type', 'application/json');

		  let url = `${this.invoicesUrl}/${invoice.Id}`;

		  return this.http
					 .delete(url, {headers: headers})
					 .toPromise()
					 .catch(this.handleError);
        }
    }