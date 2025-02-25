import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveApplyComponent } from '../components/leave-apply/leave-apply.component';
import { LeaveBalanceComponent } from '../components/leave-balance/leave-balance.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LeaveRequestDetailsComponent } from '../components/leave-request-details/leave-request-details.component';


@NgModule({
    declarations: [LeaveApplyComponent,LeaveBalanceComponent,LeaveRequestDetailsComponent],
    imports: [CommonModule,FormsModule,BrowserModule],
    exports: [LeaveApplyComponent,LeaveBalanceComponent,LeaveRequestDetailsComponent] // Export the component to make it usable outside
  })
  export class EmployeeModule {}