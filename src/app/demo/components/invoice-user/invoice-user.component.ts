import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
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

  dateOptions = [
    { label: 'This Week', value: 'thisWeek' },
    { label: 'This Month', value: 'thisMonth' },
    { label: '2 Months Ago', value: 'twoMonthsAgo' }
  ];

  selectedDateOption: string;

  isAdmin: boolean

  constructor(
    public messageService: MessageService,
    private api: ApiService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.initial_API();
  }

  async initial_API() {
    await this.get_invoice_user()
    this.admin()
  }

  async admin() {
    const permit = localStorage.getItem("_rolePerm");
    this.isAdmin = permit === 'manager' || permit === 'admin' ? true : false;
  }



  async get_invoice_user() {
    this.api.get_invoices_user().then((res: any) => {
      this.invoices = res.data
      this.table_user = true
      this.service_message('success', 'SUKSES', 'Berhasil Menampilkan Data')
    }).catch((err: any) => {
      this.service_message('warn', 'ERROR', 'Belum Ada Data')
      this.table_user = false
    })
  }

  setDateRange(option: string) {
    if (option === 'thisWeek') {
      this.setToThisWeek();
    }
    else if (option === 'thisMonth') {
      this.setToThisMonth();
    } else if (option === 'twoMonthsAgo') {
      this.setToTwoMonthsAgo();
    }
  }

  setToThisWeek() {
    const now = new Date();
    const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
    const lastDayOfWeek = new Date(now.setDate(firstDayOfWeek.getDate() + 6));

    this.date_awal = firstDayOfWeek;
    this.date_akhir = lastDayOfWeek;
  }

  setToThisMonth() {
    const now = new Date();
    this.date_awal = new Date(now.getFullYear(), now.getMonth(), 1);
    this.date_akhir = now
  }

  setToTwoMonthsAgo() {
    const now = new Date();
    this.date_awal = new Date(now.getFullYear(), now.getMonth() - 2, 1);
    this.date_akhir = now
  }

  service_message(severity, summary, detail) {
    this.messageService.clear();
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }

  post_invoices(date_awal, date_akhir) {
    if (!this.date_awal || !this.date_akhir) {
      this.service_message('warn', 'ERROR', 'Isi Rentang Tanggal Terlebih Dahulu')
      return
    }
    let param_awal = new Date(this.date_awal);
    date_awal.setDate(date_awal.getDate() + 1);
    const date1 = date_awal.toISOString().split('T')[0]

    let param_akhir = new Date(this.date_akhir);
    date_akhir.setDate(date_akhir.getDate() + 1);
    const date2 = date_akhir.toISOString().split('T')[0]

    let param = {
      start_date: date1,
      end_date: date2
    }
    this.loading = true
    this.api.invoicesUser_post(param).then((res: any) => {
      this.invoices = res.data
      this.loading = false
      this.table_user = true
      this.date_awal = null
      this.date_akhir = null
      this.service_message('success', 'SUCCESS', 'Berhasil Menampilkan Data')
    }).catch((err) => {
      console.log(err);
      this.table_user = false
      this.loading = false
      this.service_message('warn', 'ERROR', 'Tidak Ada Data Yang Ditampilkan')
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
          'Penjualan': invoice.penjualan,
          'Metode Pembayaran': invoice.metode_pembayaran
        };
      });
      const worksheet = xlsx.utils.json_to_sheet(filteredData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'invoices');
      this.selected_invoices = [];
      this.service_message('success', 'SUCCESS', 'Berhasil Ekspor Data')
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

  exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default('l', 'px', 'a4');

        const headers = [
          "Order ID", "Tanggal Order", "Tanggal Bayar", "Kasir",
          "Produk", "Penjualan", "Metode Pembayaran"
        ];

        const data = this.selected_invoices.map((product: any) => [
          product.order_id,
          product.waktu_order,
          product.waktu_bayar,
          product.kasir,
          product.produk,
          product.penjualan,
          product.metode_pembayaran
        ]);

        (doc as any).autoTable({
          head: [headers],
          body: data,
          startY: 20,
          margin: { left: 20, right: 20 },
          styles: { fontSize: 8 }
        });

        doc.save('products.pdf');
        this.selected_invoices = [];
        this.service_message('success', 'SUCCESS', 'Berhasil Ekspor Data')
      });
    });
  }

  confirm(event: Event, params) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.api.deleteInvoiceUser_post(params).then((res: any) => {
          this.service_message('info', 'Confirmed', 'Record Telah Dihapus');
          this.get_invoice_user();
          this.selected_invoices = []
        }).catch((err) => {
          console.log(err);
          this.service_message('error', 'Error', 'Gagal Menghapus Data');
        });
      },
      reject: () => {
        this.service_message('warn', 'Rejected', 'Batal Menghapus Data');
      }
    });
  }


}
