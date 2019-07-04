import { Pipe, PipeTransform } from '@angular/core';
import { Invoice, Transaction } from './invoice';

@Pipe({ name: 'computePages' })
export class ComputePagesPipe implements PipeTransform {
    transform(recordCount: number, pageSize: number): number[] {
        var numberOfPages = Math.ceil(recordCount / pageSize);

        return (new Array(numberOfPages)).fill(1);
    }
}