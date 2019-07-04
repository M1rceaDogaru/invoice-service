import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatCurrency'})
export class FormatCurrencyPipe implements PipeTransform {
  transform(value: number): string {
	  return (value < 0 ? "-" : "") + "£" + Math.abs(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
}