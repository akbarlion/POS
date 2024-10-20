import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../service/api.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-invoice-user',
  templateUrl: './invoice-user.component.html',
  styleUrl: './invoice-user.component.scss'
})
export class InvoiceUserComponent {

  date_awal: Date | undefined

  date_akhir: Date | undefined

  loading: boolean

  table_user: boolean

  invoices: any[] = []

  selected_invoices: any[] = []

  constructor(
    public messageService: MessageService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.initial_API;
  }

  async initial_API() {

  }

  post_invoices(date_awal, date_akhir) {
    let param_awal = new Date(this.date_awal);
    date_awal.setDate(date_awal.getDate() + 1);
    const date1 = date_awal.toISOString().split('T')[0]
    console.log(param_awal);

    let param_akhir = new Date(this.date_akhir);
    date_akhir.setDate(date_akhir.getDate() + 1);
    const date2 = date_akhir.toISOString().split('T')[0]
    console.log(param_akhir);

    let param = {
      start_date: date1,
      end_date: date2
    }
    this.loading = true
    this.api.invoicesUser_post(param).then((res: any) => {
      console.log(res);
      this.invoices = res.data
      this.loading = false
      this.table_user = true
    }).catch((err) => {
      console.log(err);
      this.table_user = false
      this.loading = false
    })
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      this.selected_invoices.sort((a, b) => b.order_id.localeCompare(a.order_id));
      const filteredData = this.selected_invoices.map((invoice: any) => {
        return {
          'Order ID': invoice.order_id,
          'Tanggal Order': invoice.waktu_order,
          'Tanggal Bayar': invoice.waktu_bayar,
          'Kasir': invoice.kasir,
          'Produk': invoice.produk,
          'Total Penjualan': invoice.penjualan,
          'Metode Pembayaran': invoice.metode_pembayaran
        };
      });

      const worksheet = xlsx.utils.json_to_sheet(filteredData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'invoices');
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
