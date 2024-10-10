import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserlainRoutingModule } from './userlain-routing.module';
import { UserlainComponent } from './userlain.component';


@NgModule({
  declarations: [
    UserlainComponent
  ],
  imports: [
    CommonModule,
    UserlainRoutingModule
  ]
})
export class UserlainModule { }
