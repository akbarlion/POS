import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesComponent } from './invoices.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: InvoicesComponent }
  ])],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
