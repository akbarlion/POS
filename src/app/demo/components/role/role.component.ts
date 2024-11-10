// import { Component } from '@angular/core';
// import { MessageService } from 'primeng/api';

// @Component({
//   selector: 'app-role',
//   templateUrl: './role.component.html',
//   styleUrl: './role.component.scss'
// })
// export class RoleComponent {

//   selected_role: string

//   roleOptions = [
//     { label: 'Admin', value: 'admin' },
//     { label: 'Manager', value: 'manager' },
//     { label: 'User', value: 'user' }
//   ];
//   accessOptions: string[] = [];

//   constructor(
//     public messageService: MessageService
//   ) { }

//   accessByRole = {
//     admin: [
//       { label: 'Dashboard', value: 'dashboard', checked: true },
//       { label: 'Invoice Admin', value: 'invoice-admin', checked: true },
//       { label: 'Invoice User', value: 'invoice-admin', checked: true },
//       { label: 'Users', value: 'invoice-admin', checked: true },
//     ],
//     manager: [
//       { label: 'Dashboard', value: 'dashboard', checked: true },
//       { label: 'Invoice Admin', value: 'invoice-admin', checked: true },
//       { label: 'Invoice User', value: 'invoice-admin', checked: true },
//       { label: 'Users', value: 'invoice-admin', checked: true },
//     ],
//     user: [
//       { label: 'Dashboard', value: 'dashboard', checked: true },
//       { label: 'Invoice Admin', value: 'invoice-admin', checked: false },
//       { label: 'Invoice User', value: 'invoice-admin', checked: true },
//       { label: 'Users', value: 'invoice-admin', checked: false },
//     ],
//   };

//   setRole(role) {
//     this.selected_role = role;
//     this.accessOptions = this.accessByRole[role] || [];
//     console.log(this.accessOptions);

//   }


// }


import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {

  selected_role: string;

  roleOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'Manager', value: 'manager' },
    { label: 'User', value: 'user' }
  ];
  accessOptions: any[] = [];

  constructor(public messageService: MessageService) { }

  accessByRole = {
    admin: [
      { label: 'Dashboard', value: 'dashboard', checked: true },
      { label: 'Invoice Admin', value: 'invoice-admin', checked: true },
      { label: 'Invoice User', value: 'invoice-user', checked: true },
      { label: 'Users', value: 'users', checked: true },
    ],
    manager: [
      { label: 'Dashboard', value: 'dashboard', checked: true },
      { label: 'Invoice Admin', value: 'invoice-admin', checked: true },
      { label: 'Invoice User', value: 'invoice-user', checked: true },
      { label: 'Users', value: 'users', checked: true },
    ],
    user: [
      { label: 'Dashboard', value: 'dashboard', checked: true },
      { label: 'Invoice Admin', value: 'invoice-admin', checked: false },
      { label: 'Invoice User', value: 'invoice-user', checked: true },
      { label: 'Users', value: 'users', checked: false },
    ],
  };

  setRole(role) {
    this.selected_role = role;
    // Force Angular untuk nge-detect perubahan akses
    this.accessOptions = [...(this.accessByRole[role] || [])];
    console.log(this.accessOptions);
  }
}
