    export class Invoice {
      Id: string;
      InvoiceNumber: string;
	  InvoiceDate: string;
	  Status: string;
	  Client: string;
	  Total: number;
	  VatTotal: number;
	  Transactions: Transaction[];
    }
	
	export class Transaction {
        Id: string;
        InvoiceId: string;
		Description: string;
		UnitPrice: number;
		Quantity: number;
		Vat: number;
		Total: number;
	}