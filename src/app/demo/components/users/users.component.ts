import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  users: any = []

  selectedUsers: any[] = []

  loadingUsername: boolean = false

  add_dialog: boolean

  username: string

  password: string

  role_access: string[] = []

  selectedRole: any

  edit_dialog: boolean

  data_update = {
    username: null,
    role_perm: null,
    description: ''
  }

  roleList = [
    { value: '5', label: 'Manager', description: 'Bisa manage seluruh data, user, dan laporan.' },
    { value: '6', label: 'Admin', description: 'Bisa akses dan ubah data, tapi tidak bisa hapus user.' },
    { value: '7', label: 'User', description: 'Hanya bisa lihat data tanpa akses untuk mengubah.' }
  ];

  constructor(
    private messageService: MessageService,
    private api: ApiService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.initialAPI()
  }

  async initialAPI() {
    await this.get_user();
    await this.isAdmin();
    await this.get_role_access();
  }

  service_message(severity, summary, detail) {
    this.messageService.clear;
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }

  onRoleChange(event: any) {
    const selectedRole = this.roleList.find(role => role.value === event.value);
    this.data_update.description = selectedRole ? selectedRole.description : '';
  }



  async get_user() {
    this.api.users_get().then((res: any) => {
      this.users = res.data
    }).catch((err) => {
      console.log(err);
      this.service_message('warn', 'ERROR', 'Tidak Ada Data yang Ditampilkan')
    })
  }

  async get_role_access() {
    this.api.role_get().then((res: any) => {
      this.role_access = res.data
    }).catch((err) => {
      console.log(err);
    })
  }

  create_new() {
    this.add_dialog = true
  }

  async isAdmin(): Promise<boolean> {
    const rolePerm = localStorage.getItem('_rolePerm');
    return rolePerm === 'manager';
  }

  generateRandomId(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  add_user() {
    if (!this.username && !this.password) {
      this.service_message('error', 'ERROR', 'Form Cannot be Blank!')
      return
    }

    const data = {
      id_user: this.generateRandomId(10),
      username: this.username,
      password: this.password,
      id_access: this.selectedRole.id_access,
      modified_by: JSON.parse(localStorage.getItem("_userInfo")).username
    }

    this.api.insertUser_post(data).then((res: any) => {
      if (res.status == 200) {
        this.service_message('success', 'SUCCESS', 'Berhasil Menambahkan User')
        this.add_dialog = false
        this.username = null
        this.password = null
        this.selectedRole = null
        this.get_user()
      } else if (res.status == 400) {
        this.service_message('warn', 'ERROR', 'Username sudah ada')
      }
    }).catch((error) => {
      console.log(error);
      this.service_message('warn', 'ERROR', 'Gagal Menambahkan User')
    })
  }

  close_add_dialog() {
    this.add_dialog = false
    this.username = null
    this.password = null
    this.selectedRole = null
  }

  update_data(params) {
    this.edit_dialog = true
    this.data_update = { ...params }
  }

  updating(params) {
    const dataUpdate = {
      username: params.username,
      role_access_id: params.role_perm
    }

    this.api.updateUser_post(dataUpdate).then((res: any) => {
      console.log(res);
      this.service_message('success', 'SUCCESS', 'Berhasil Update Data')
      this.get_user()
      this.close_edit_dialog()
    }).catch((err) => {
      console.log(err);
      this.service_message('warn', 'ERROR', 'Gagal Update Data / Tidak Ada Data yang Dirubah')
    })
  }

  close_edit_dialog() {
    this.edit_dialog = false
    this.data_update = null
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
        this.api.deleteUser_post({ username: params.username }).then
          ((res: any) => {
            this.service_message('info', 'Confirmed', 'Record Telah Dihapus')
            this.get_user()
          }).catch((err) => {
            this.service_message('error', 'Failed', 'Gagal Menghapus Data')
          })
        this.get_user()
      },
      reject: () => {
        this.service_message('error', 'Rejected', 'Batal Menghapus Data')
      }
    });
  }



}

