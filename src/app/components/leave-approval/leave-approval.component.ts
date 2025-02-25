import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Leave } from 'src/app/models/leave.model';
import { AuthService } from 'src/app/services/auth.service';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-leave-approval',
  templateUrl: './leave-approval.component.html',
  styleUrl: './leave-approval.component.css'
})
export class LeaveApprovalComponent implements OnInit {

  userId: number = 0;
  public leaveRequests: Leave[] = [];  

  constructor(private _authService: AuthService, private _leaveService: LeaveService, private _router: Router) {
  }

  searchText: string = '';    

  ngOnInit(): void {    
    this.getLeaveRequests();
  }
  

  get filteredData() {
    
    return this.leaveRequests.filter(item =>      
      item.managerComments?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.leaveType?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.status?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.userId?.toString().includes(this.searchText.toString())      
    );
  }

  ApproveLeave(id?: number) {
    if (confirm("Are you sure you want to approve ?")) {
      this._leaveService.approveLeave(id,true).subscribe(data => {
        alert("Leave approved successfully !");
        this.getLeaveRequests();
      })
    }    
  }

  RejectLeave(id?: number) {
    if (confirm("Are you sure you want to reject ?")) {
      this._leaveService.rejectLeave(id,true).subscribe(data => {
        alert("Leave rejected successfully !");
        this.getLeaveRequests();
      })
    }
    //this._router.navigate(['/edit-product', id]);
  }

  getLeaveRequests(){
    this._leaveService.getPendingLeaves().subscribe(data => {
      this.leaveRequests = data.response;            
    })
  }

  CommentLeave(id?: number) {
    this._router.navigate(['/leave-comment', id]);

  }


}
