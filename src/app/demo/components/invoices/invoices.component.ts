import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { ApiService } from '../../service/api.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';



interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss'
})
export class InvoicesComponent {

  // TESTING CHANGE SEVERITIES

  invoices: any[] = []

  loadingInvoices: boolean = false

  selected_invoices: any = []

  date_awal: Date | undefined;

  date_akhir: Date | undefined;

  checkedPost: boolean

  uploadDialog: boolean

  createNewDialog: boolean

  loadingUpload: boolean

  uploadingDialog: boolean

  data_excel: any[] = []

  selected_data_excel: any[] = []

  orders: any[] = []

  tabel: boolean

  selectedItems: any[] = []

  dateOptions = [
    { label: 'This Week', value: 'thisWeek' },
    { label: 'This Month', value: 'thisMonth' },
    { label: '2 Months Ago', value: 'twoMonthsAgo' }
  ];

  selectedDateOption: string;


  constructor(
    private api: ApiService,
    public messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.initialAPI()
  }

  async initialAPI() {
    await this.get_category()
    await this.get_invoices()
  }

  async get_invoices() {
    this.api.get_invoices().then((res: any) => {
      this.invoices = res.data
      this.tabel = true
      this.service_message('success', 'SUCCESS', 'Menampilkan data yang sudah dipost ke User!')
    }).catch((err) => {
      console.log(err);
      this.tabel = false
      this.service_message('warn', 'WARNING', 'Belum ada data yang dipost ke User!')
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


  service_message(severity: string, summary: string, detail: string) {
    this.messageService.clear();
    this.messageService.add({ severity: severity, summary: summary, detail: detail })
  }

  async get_category() {
    let category;
    this.api.get_category().then((res: string) => {
      category = res
    }).catch((error) => {
      console.log(error);
    })
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
    this.loadingInvoices = true
    this.api.invoices_post(param).then((res: any) => {
      this.invoices = res.data
      console.log(this.invoices);
      this.tabel = true
      this.loadingInvoices = false
      this.service_message('success', 'SUCCESS', 'Berhasil Menampilkan Data')
      this.date_awal = null
      this.date_akhir = null
      this.selectedDateOption = null
    }).catch((err) => {
      console.log(err);
      this.tabel = false
      this.loadingInvoices = false
      this.date_awal = null
      this.date_akhir = null
      this.selectedDateOption = null
      this.service_message('warn', 'ERROR', 'Tidak Ada Data Yang Ditampilkan')
    })
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
      const sortedData = this.selected_invoices.sort((a: any, b: any) => {
        if (a.order_id < b.order_id) return -1;
        if (a.order_id > b.order_id) return 1;
        return 0;
      });
      const filteredData = sortedData.map((invoice: any) => {
        return {
          'Order ID': invoice.order_id,
          'Waktu Order': invoice.waktu_order,
          'Waktu Bayar': invoice.waktu_bayar,
          'Outlet': invoice.outlet,
          'Kasir': invoice.kasir,
          'Produk': invoice.produk,
          'Jenis Order': invoice.jenis_order,
          'Penjualan': invoice.penjualan,
          'Tagihan': invoice.tagihan,
          'Metode Pembayaran': invoice.metode_pembayaran
        };
      });
      const worksheet = xlsx.utils.json_to_sheet(filteredData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'invoices');
      this.selected_invoices = [];
      this.service_message('success', 'SUCCESS', 'Berhasil Ekspor Data');
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

  // onUpload(event: UploadEvent) {
  //   this.uploadDialog = true;
  //   this.uploadingDialog = true;
  //   this.loadingUpload = true;

  //   if (!event.files || event.files.length !== 1) {
  //     console.error('Pilih file satuan, bro!');
  //     this.uploadingDialog = false;
  //     this.loadingUpload = false;
  //     return;
  //   }

  //   const reader: FileReader = new FileReader();
  //   reader.onload = (e: any) => {
  //     const bstr: string = e.target.result;
  //     const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  //     const wsname: string = wb.SheetNames[0];
  //     const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  //     const data: any[] = XLSX.utils.sheet_to_json(ws, { header: 1 });

  //     const headers: string[] = data[0];
  //     const rows = data.slice(1);
  //     this.data_excel = [];

  //     rows.forEach((row: any) => {
  //       if (row.length > 0) {
  //         const noNota = row[headers.indexOf("No Nota")];
  //         const waktuOrder = row[headers.indexOf("Waktu Order")];
  //         const waktuBayar = row[headers.indexOf("Waktu Bayar")];
  //         const outlet = row[headers.indexOf("Outlet")];
  //         const order = row[headers.indexOf("Order")];
  //         const kasir = row[headers.indexOf("Kasir")];
  //         const jenisOrder = row[headers.indexOf("Jenis Order")];
  //         const total = row[headers.indexOf("Penjualan (Rp.)")];
  //         const tagihan = row[headers.indexOf("Tagihan (Rp.)")];
  //         const metode_pembayaran = row[headers.indexOf("Metode Pembayaran")];
  //         const produk = row[headers.indexOf("Produk")];

  //         if (noNota && waktuOrder && outlet && order) {
  //           this.data_excel.push({
  //             "order_id": noNota,
  //             "waktu_order": waktuOrder,
  //             "waktu_bayar": waktuBayar,
  //             "outlet": outlet,
  //             "order": order,
  //             "kasir": kasir,
  //             "produk": produk,
  //             "jenis_order": jenisOrder,
  //             "penjualan": total,
  //             "tagihan": tagihan,
  //             "metode_pembayaran": metode_pembayaran
  //           });
  //         }
  //       }
  //       console.log(this.data_excel);
  //     });


  //     this.uploadingDialog = false;
  //     this.loadingUpload = false;
  //   };

  //   reader.onerror = (error) => {
  //     console.error('Error reading file:', error);
  //     this.uploadingDialog = false;
  //     this.loadingUpload = false;
  //   };
  //   reader.readAsBinaryString(event.files[0]);
  // }

  onUpload(event: UploadEvent) {
    this.uploadDialog = true;
    this.uploadingDialog = true;
    this.loadingUpload = true;

    if (!event.files || event.files.length !== 1) {
      console.error('Pilih file satuan, bro!');
      this.uploadingDialog = false;
      this.loadingUpload = false;
      return;
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data: any[] = XLSX.utils.sheet_to_json(ws, { header: 1 });


      const headers: string[] = data[0];

      const headerIndexes = {
        noNota: headers.indexOf("Order ID"),
        waktuOrder: headers.indexOf("Waktu Order"),
        waktuBayar: headers.indexOf("Waktu Bayar"),
        outlet: headers.indexOf("Outlet"),
        order: headers.indexOf("Produk"),
        kasir: headers.indexOf("Kasir"),
        jenisOrder: headers.indexOf("Jenis Order"),
        total: headers.indexOf("Penjualan"),
        tagihan: headers.indexOf("Tagihan"),
        metodePembayaran: headers.indexOf("Metode Pembayaran"),
        produk: headers.indexOf("Produk"),
      };


      const missingHeaders = Object.keys(headerIndexes).filter(key => headerIndexes[key] === -1);
      if (missingHeaders.length > 0) {
        console.warn("Header yang gak ketemu:", missingHeaders);
        this.uploadingDialog = false;
        this.loadingUpload = false;
        return;
      }

      const rows = data.slice(1);
      this.data_excel = [];

      rows.forEach((row: any, index: number) => {
        if (row.length > 0) {
          const noNota = row[headerIndexes.noNota];
          const waktuOrder = row[headerIndexes.waktuOrder];
          const waktuBayar = row[headerIndexes.waktuBayar];
          const outlet = row[headerIndexes.outlet];
          const order = row[headerIndexes.order];
          const kasir = row[headerIndexes.kasir];
          const jenisOrder = row[headerIndexes.jenisOrder];
          const total = row[headerIndexes.total];
          const tagihan = row[headerIndexes.tagihan];
          const metodePembayaran = row[headerIndexes.metodePembayaran];
          const produk = row[headerIndexes.produk];

          if (!noNota || !waktuOrder || !outlet || !order) {
            console.warn(`Baris ${index + 1} ada yang kosong, skip!`, row);
            return;
          }

          this.data_excel.push({
            "order_id": noNota,
            "waktu_order": waktuOrder,
            "waktu_bayar": waktuBayar,
            "outlet": outlet,
            "order": order,
            "kasir": kasir,
            "produk": produk,
            "jenis_order": jenisOrder,
            "penjualan": total,
            "tagihan": tagihan,
            "metode_pembayaran": metodePembayaran
          });
        }
      });


      if (this.data_excel.length === 0) {
        console.warn("Gak ada data valid yang bisa diproses!");
      }

      this.uploadingDialog = false;
      this.loadingUpload = false;
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      this.uploadingDialog = false;
      this.loadingUpload = false;
    };

    reader.readAsBinaryString(event.files[0]);
  }

  create_new() {
    this.createNewDialog = true
  }

  hideDialog_create() {
    this.createNewDialog = false
  }

  hideDialog_upload() {
    this.uploadDialog = false
    this.data_excel = []
  }

  upload(param) {
    this.api.upload_post(param).then((res) => {
      this.uploadDialog = false
      this.data_excel = []
      this.get_invoices()
      this.service_message('success', 'SUCCESS', 'Success Uploading Data')
    }).catch((error) => {
      console.log(error);
      this.service_message('error', 'FAILED', 'Failed Uploading Data')
    })
  }

  postToUser(param) {
    this.api.uploadUser_post(param).then((res: any) => {
      this.service_message('success', 'SUCCESS', 'Data Berhasil Dikirimkan ke User!')
      this.selected_invoices = []
    }).catch((err) => {
      console.log(err);
      this.service_message('warn', 'Warning', 'Data Sudah Ada')
    })
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
        this.api.deleteInvoiceAdmin_post(params).then((res: any) => {
          this.service_message('info', 'Confirmed', 'Record Telah Dihapus');
          this.get_invoices()
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

  exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default('l', 'px', 'a4');

        const headers = [
          "Order ID", "Waktu Order", "Waktu Bayar", "Outlet", "Kasir",
          "Produk", "Jenis Order", "Penjualan", "Tagihan", "Metode Pembayaran"
        ];
        const sortedInvoices = this.selected_invoices.sort((a: any, b: any) => {
          if (a.order_id < b.order_id) return -1;
          if (a.order_id > b.order_id) return 1;
          return 0;
        });
        const data = sortedInvoices.map((product: any) => [
          product.order_id,
          product.waktu_order,
          product.waktu_bayar,
          product.outlet,
          product.kasir,
          product.produk,
          product.jenis_order,
          product.penjualan,
          product.tagihan,
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
        this.service_message('success', 'SUCCESS', 'Berhasil Ekspor Data');
      });
    });
  }


  // downloadTemplate() {
  //   const headers = [
  //     ['Order ID', 'Waktu Order', 'Waktu Bayar', 'Outlet', 'Kasir', 'Produk',
  //       'Jenis Order', 'Penjualan', 'Tagihan', 'Metode Pembayaran']
  //   ];
  //   const worksheet = XLSX.utils.aoa_to_sheet(headers);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');
  //   XLSX.writeFile(workbook, 'Template.xlsx');
  // }

  downloadTemplate() {
    const headers = [
      ['Order ID', 'Waktu Order', 'Waktu Bayar', 'Outlet', 'Kasir', 'Produk',
        'Jenis Order', 'Penjualan', 'Tagihan', 'Metode Pembayaran']
    ];

    // Tambahin data contoh dengan "contoh:" dan formatting italic
    const data = [
      [
        'contoh: CS/56/240701/0001',
        'contoh: 2024-07-01 15:20:33',
        'contoh: 2024-07-01 15:21:58',
        'contoh: Dhadhu Board Game Cafe',
        'contoh: Abyan',
        'contoh: Red Velvet,Salmon Mentai,Meeple Fries,Lemon Tea',
        'contoh: Lainnya',
        'contoh: Rp94.000,00',
        'contoh: Rp0,00',
        'contoh: Bank Transfer - QRIS'
      ]
    ];

    const worksheet = XLSX.utils.aoa_to_sheet([...headers, ...data]);

    // // Styling buat bikin italic di tiap cell data
    // for (let i = 0; i < data[0].length; i++) {
    //   const cellRef = XLSX.utils.encode_cell({ r: 1, c: i }); // Row 1 karena header di row 0
    //   if (!worksheet[cellRef]) continue;
    //   worksheet[cellRef].s = { font: { italic: true } }; // Tambahin styling italic
    // }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');
    XLSX.writeFile(workbook, 'Template.xlsx');
  }


}