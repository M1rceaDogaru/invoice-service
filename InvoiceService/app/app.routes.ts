import { provideRouter, RouterConfig }  from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { DashboardComponent } from './dashboard.component';
import { InvoiceDetailComponent } from './invoice-detail.component';

const routes: RouterConfig = [
	{
	  path: '',
	  redirectTo: '/dashboard',
	  pathMatch: 'full'
	},
	{
		path: 'invoices',
		component: InvoicesComponent
	},
	{
	  path: 'dashboard',
	  component: DashboardComponent
	},	
	{
	  path: 'invoice/:id',
	  component: InvoiceDetailComponent
	},
	{
	  path: 'invoice',
	  component: InvoiceDetailComponent
	}
];

export const appRouterProviders = [
  provideRouter(routes)
];