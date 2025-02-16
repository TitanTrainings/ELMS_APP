import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveApprovalComponent } from '../components/leave-approval/leave-approval.component';
import { LeaveHistoryComponent } from '../components/leave-history/leave-history.component';
import { FormsModule } from '@angular/forms';
import { ManagerLeaveCommentComponent } from '../components/manager-leave-comment/manager-leave-comment.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
    declarations: [LeaveApprovalComponent,LeaveHistoryComponent,ManagerLeaveCommentComponent],
    imports: [CommonModule,FormsModule,BrowserModule],
    exports: [LeaveApprovalComponent,LeaveHistoryComponent,ManagerLeaveCommentComponent] // Export the component to make it usable outside
  })
  export class ManagerModule {}