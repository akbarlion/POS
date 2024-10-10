import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlainComponent } from './userlain.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: UserlainComponent }
  ])],
  exports: [RouterModule]
})
export class UserlainRoutingModule { }
