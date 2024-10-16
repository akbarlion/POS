import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import * as FileSaver from 'file-saver';
import { ApiService } from '../../service/api.service';
import { MessageService } from 'primeng/api';
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

  constructor(
    private api: ApiService,
    public messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.initialAPI()
  }

  async initialAPI() {
    await this.get_category()
  }

  async get_invoices() {
    this.api.get_invoices().then((res: any) => {
      this.invoices = res.data
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  service_message(severity: string, summary: string, detail: string){
    this.messageService.clear()
    this.messageService.add({severity: severity, summary: summary, detail: detail})
  }


  async get_category() {
    let category;
    this.api.get_category().then((res: string) => {
      category = res
    }).catch((error) => {
      console.log(error);
    })
  }

  post_invoices(date_awal, date_akhir){
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
    this.loadingInvoices = true
    this.api.invoices_post(param).then((res: any)=>{
      this.invoices = res.data
      this.tabel = true
      this.loadingInvoices = false
    }).catch((err)=>{
      console.log(err);
      this.tabel = false
      this.loadingInvoices = false
    })
  }


  filterByDisplay(value, filter): boolean {
    const displayValue = value === 1 ? 'PAID' : 'NO';
    return displayValue.toLowerCase().includes(filter.toLowerCase());
  }

  onChange() {
    this.checkedPost = !this.checkedPost
  }

  onSelectionChange(event: any) {
    this.selectedItems = event; // Update array dengan item yang dipilih
  }
  

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.selected_invoices);
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


  // onUpload(event: UploadEvent) {
  //   this.uploadDialog = true;
  //   this.uploadingDialog = true
  //   this.loadingUpload = true
  
  //   if (!event.files || event.files.length !== 1) {
  //     console.error('Pilih file satuan, bro!');
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
  //     console.log(rows);
      
  //     const jsonData: any[] = [];
  
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
  
  //         this.data_excel.push({
  //           "order_id": noNota,
  //           "waktu_order": waktuOrder,
  //           "waktu_bayar": waktuBayar,
  //           "outlet": outlet,
  //           "order": order,
  //           "kasir": kasir,
  //           "produk": produk,
  //           "jenis_order": jenisOrder,
  //           "penjualan": total,
  //           "tagihan": tagihan,
  //           "metode_pembayaran": metode_pembayaran
  //         });
  //       }
  //     });
  //     this.uploadingDialog = false
  //     this.loadingUpload = false
  //   };
  //   reader.readAsBinaryString(event.files[0]);
  // }

  onUpload(event: UploadEvent) {
    this.uploadDialog = true;
    this.uploadingDialog = true;
    this.loadingUpload = true;
  
    // Validasi untuk memastikan hanya satu file yang dipilih
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
      const rows = data.slice(1);
      this.data_excel = []; // Reset data sebelum memproses upload baru
  
      rows.forEach((row: any) => {
        if (row.length > 0) {
          const noNota = row[headers.indexOf("No Nota")];
          const waktuOrder = row[headers.indexOf("Waktu Order")];
          const waktuBayar = row[headers.indexOf("Waktu Bayar")];
          const outlet = row[headers.indexOf("Outlet")];
          const order = row[headers.indexOf("Order")];
          const kasir = row[headers.indexOf("Kasir")];
          const jenisOrder = row[headers.indexOf("Jenis Order")];
          const total = row[headers.indexOf("Penjualan (Rp.)")];
          const tagihan = row[headers.indexOf("Tagihan (Rp.)")];
          const metode_pembayaran = row[headers.indexOf("Metode Pembayaran")];
          const produk = row[headers.indexOf("Produk")];
  
          // Validasi data sebelum ditambahkan
          if (noNota && waktuOrder && outlet && order) {
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
              "metode_pembayaran": metode_pembayaran
            });
          }
        }
      });
  
      this.uploadingDialog = false;
      this.loadingUpload = false;
    };
  
    // Error handling saat membaca file
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

  upload(param){
    this.api.upload_post(param).then((res)=>{
      this.uploadDialog = false
      this.data_excel = []
      this.service_message('success', 'SUCCESS', 'Success Uploading Data')
    }).catch((error)=>{
      console.log(error);
      this.service_message('error', 'FAILED', 'Failed Uploading Data')
    })
  }


  
}

// onUpload(event: UploadEvent) {
  //   this.uploadDialog = true;
  //   // this.loadingUpload = true;
  //   console.log(event);
  
  //   if (!event.files || event.files.length !== 1) {
    //     console.error('Pilih file satuan, bro!');
    //     // this.loadingUpload = false;
    //     return;
    //   }
    //   const reader: FileReader = new FileReader();
    //   // reader.onload = (e: any) => {
      //   //   const bstr: string = e.target.result;
      //   //   const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      //   //   const wsname: string = wb.SheetNames[0];
      //   //   const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      //   //   const data: any[] = XLSX.utils.sheet_to_json(ws, { header: 1 });
      //   //   const headers: string[] = data[11];
      //   //   const rows = data.slice(1);
      //   //   const jsonData = rows.map((row: any) => {
        //   //     let obj: any = {};
        //   //     headers.forEach((header: string, index: number) => {
          //   //       obj[header] = row[index];
          //   //     });
          //   //     return obj;
          //   //   });
          
          //   //   console.log('JSON Data:', jsonData);
          //   //   // this.loadingUpload = false;
          //   // };
          
          //   reader.onload = (e: any) => {
            //     const bstr: string = e.target.result;
//     const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
//     const wsname: string = wb.SheetNames[0];
//     const ws: XLSX.WorkSheet = wb.Sheets[wsname];
//     const data: any[] = XLSX.utils.sheet_to_json(ws, { header: 1 });
//     const headers: string[] = data[0];
//     const rows = data.slice(1);
//     const jsonData: any[] = [];

//     rows.forEach((row: any) => {
  //       if (row.length > 0) {
    //         const id = row[headers.indexOf("id")];
    //         const noNota = row[headers.indexOf("No Nota")];
    //         const waktuOrder = row[headers.indexOf("Waktu Order")];
    //         const waktuBayar = row[headers.indexOf("Waktu Bayar")];
    //         const outlet = row[headers.indexOf("Outlet")];
    //         const kasir = row[headers.indexOf("Kasir")];
    //         const jenisOrder = row[headers.indexOf("Jenis Order")];
    //         const total = row[headers.indexOf("Penjualan (Rp.)")];
    //         const tagihan = row[headers.indexOf("Tagihan (Rp.)")];
    //         const metodePembayaran = row[headers.indexOf("Metode Pembayaran")];
    
    //         const produkIndex = headers.indexOf("Produk");
    //         if (produkIndex !== -1 && row[produkIndex]) {
//           const produkList = row[produkIndex].split(',');
//           produkList.forEach((produk: string) => {
//             this.data_excel.push({
//               "id": id,
//               "order_id": noNota,
//               "waktu_order": waktuOrder,
//               "waktu_bayar": waktuBayar,
//               "outlet": outlet,
//               "kasir": kasir,
//               "produk": produk.trim(),
//               "jenis_order": jenisOrder,
//               "penjualan": total,
//               "tagihan": tagihan,
//               "metode_pembayaran": metodePembayaran
//             });
//           });
//         }
//       }
//     });

//     console.log('JSON Data:', this.data_excel);
//   };
//   reader.readAsBinaryString(event.files[0]);
// }
// onUpload(event: UploadEvent) {
//   this.uploadDialog = true;
//   console.log(event);

//   if (!event.files || event.files.length !== 1) {
//     console.error('Pilih file satuan, bro!');
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
//     const jsonData: any[] = [];

//     rows.forEach((row: any) => {
//       if (row.length > 0) {
//         const id = row[headers.indexOf("id")];
//         const noNota = row[headers.indexOf("No Nota")];
//         const waktuOrder = row[headers.indexOf("Waktu Order")];
//         const waktuBayar = row[headers.indexOf("Waktu Bayar")];
//         const outlet = row[headers.indexOf("Outlet")];
//         const kasir = row[headers.indexOf("Kasir")];
//         const jenisOrder = row[headers.indexOf("Jenis Order")];
//         const total = row[headers.indexOf("Penjualan (Rp.)")];
//         const tagihan = row[headers.indexOf("Tagihan (Rp.)")];
//         const metodePembayaran = row[headers.indexOf("Metode Pembayaran")];


//         const produkIndex = headers.indexOf("Produk");
//         if (produkIndex !== -1 && row[produkIndex]) {
//           const produkList = row[produkIndex].split(',');


//           produkList.forEach((produk: string) => {
//             this.data_excel.push({
//               "id": id,
//               "order_id": noNota,
//               "waktu_order": waktuOrder,
//               "waktu_bayar": waktuBayar,
//               "outlet": outlet,
//               "kasir": kasir,
//               "produk": produkIndex,
//               "jenis_order": jenisOrder,
//               "penjualan": total,
//               "tagihan": tagihan,
//               "metode_pembayaran": metodePembayaran
//             });
//           });
//         }
//       }
//     });

//     console.log('JSON Data:', this.data_excel);
//   };

//   reader.readAsBinaryString(event.files[0]);
// }