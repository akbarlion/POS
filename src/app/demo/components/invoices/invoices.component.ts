import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import * as FileSaver from 'file-saver';


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
    this.invoices
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

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.selectedCustomers);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }



}
