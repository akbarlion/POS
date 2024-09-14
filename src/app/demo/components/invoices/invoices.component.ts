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

  selectedCustomers: any

  date_awal: Date | undefined;

  date_akhir: Date | undefined;

  checkedPost: boolean

  constructor(

  ) { }
  ngOnInit(): void {
    this.initialAPI()
  }
  async initialAPI() {
    this.invoices = [
      { id: 1, invoice_id: 'ASDFHKLKASJDOI', user: 'Admin', is_paid: 'NO' },
      { id: 2, invoice_id: 'QWEOIUIOQWER', user: 'Admin', is_paid: 'PAID' },
      { id: 3, invoice_id: 'MNZXBCMNBZXC', user: 'Admin', is_paid: 'NO' },
    ];
  }

  filterByDisplay(value, filter): boolean {
    const displayValue = value === 1 ? 'PAID' : 'NO';
    return displayValue.toLowerCase().includes(filter.toLowerCase());
  }

  onChange() {
    this.checkedPost = !this.checkedPost
  }



}
