    import { Component }       from '@angular/core';
	import { ROUTER_DIRECTIVES } from '@angular/router';
	
	import { InvoiceService }     from './invoice.service';
	
    @Component({
      selector: 'my-app',
      templateUrl: 'app/app.component.html',
	  styleUrls: ['app/app.component.css'],
      directives: [ROUTER_DIRECTIVES],
      providers: [
        InvoiceService
      ]
    })
    export class AppComponent {
      title = 'Invoice manager';
    }