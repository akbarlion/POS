import { Component } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss'
})
export class InvoicesComponent {
  invoices: any[] = []

  loadingInvoices: boolean = false

  constructor(

  ) { }
  ngOnInit(): void {
    this.initialAPI()
  }
  async initialAPI() {
    this.invoices = [
      { id: 1, invoice_id: 'ASDFHKLKASJDOI', user: 'Admin', is_paid: '0' },
      { id: 2, invoice_id: 'QWEOIUIOQWER', user: 'Admin', is_paid: '1' },
      { id: 3, invoice_id: 'MNZXBCMNBZXC', user: 'Admin', is_paid: '0' },
    ];
  }


}
