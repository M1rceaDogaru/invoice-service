import { Pipe, PipeTransform } from '@angular/core';
import { Invoice, Transaction } from './invoice';

@Pipe({name: 'calculateTransactionVat'})
export class CalculateTransactionVatPipe implements PipeTransform {
  transform(unitPrice: number, quantity: number, transaction: Transaction): number {
	  //TODO: configurable VAT rate
	  transaction.Vat = (unitPrice * quantity) * 20 / 100;
	  return transaction.Vat;
  }
}

@Pipe({name: 'calculateTransactionTotal'})
export class CalculateTransactionTotalPipe implements PipeTransform {
  transform(unitPrice: number, quantity: number, transaction: Transaction, invoice: Invoice): number {
	  transaction.Total = (unitPrice * quantity) + transaction.Vat;
	  
	  let total = 0;
	  for (let transaction of invoice.Transactions) {
		  total += transaction.Total;
	  }
	  invoice.Total = total;
	  
	  return transaction.Total;
  }
}