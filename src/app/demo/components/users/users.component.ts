import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  users: any = []
  selectedUsers: any[] = []
  loadingUsername: boolean = false

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.initialAPI()
  }

  async initialAPI() {
    this.users = [
      { id: 1, username: 'dafa', full_name: 'Dafa Sultan Atalariq', role: 'manager' },
      { id: 2, username: 'admin', full_name: 'Admin', role: 'admin' },
      { id: 3, username: 'Rizal', full_name: 'Common', role: 'user' },
    ];
  }



}

