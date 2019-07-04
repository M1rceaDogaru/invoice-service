"use strict";
var router_1 = require('@angular/router');
var invoices_component_1 = require('./invoices.component');
var dashboard_component_1 = require('./dashboard.component');
var invoice_detail_component_1 = require('./invoice-detail.component');
var routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'invoices',
        component: invoices_component_1.InvoicesComponent
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'invoice/:id',
        component: invoice_detail_component_1.InvoiceDetailComponent
    },
    {
        path: 'invoice',
        component: invoice_detail_component_1.InvoiceDetailComponent
    }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map