"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var invoices = [
            { id: 11, number: 'INV0001', date: '2016-03-21', status: 'Paid', client: 'Vision', total: 2760,
                transactions: [
                    {
                        id: 200, description: 'Consultancy fees', unitPrice: 2000, quantity: 1, vat: 400, total: 2400
                    },
                    {
                        id: 201, description: 'Penalty for late payment', unitPrice: 300, quantity: 1, vat: 60, total: 360
                    }
                ]
            },
            { id: 12, number: 'INV0002', date: '2016-04-23', status: 'Paid', client: 'Elcan Ltd.', total: 3960,
                transactions: [
                    {
                        id: 202, description: 'Consultancy fees', unitPrice: 3000, quantity: 1, vat: 600, total: 3600
                    },
                    {
                        id: 203, description: 'Penalty for late payment', unitPrice: 300, quantity: 1, vat: 60, total: 360
                    }
                ]
            },
            { id: 13, number: 'INV0003', date: '2016-05-03', status: 'Unpaid', client: 'Cocoro', total: 7200,
                transactions: [
                    {
                        id: 204, description: 'Laptop HP Pavilion AK15001', unitPrice: 600, quantity: 5, vat: 600, total: 3600
                    },
                    {
                        id: 205, description: 'Microsoft Windows 10 Professional License', unitPrice: 100, quantity: 6, vat: 120, total: 720
                    },
                    {
                        id: 206, description: 'Kaspersky Antivirus 4 License', unitPrice: 100, quantity: 6, vat: 120, total: 720
                    },
                    {
                        id: 207, description: 'HP Docking station', unitPrice: 300, quantity: 6, vat: 360, total: 2160
                    }
                ]
            }
        ];
        return { invoices: invoices };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map