import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Leave } from 'src/app/models/leave.model';
import { AuthService } from 'src/app/services/auth.service';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrl: './leave-history.component.css'
})
export class LeaveHistoryComponent implements OnInit {

  userId: number = 0;
  public leaveHistory: Leave[] = [];


  constructor(private _leaveService: LeaveService, private _authService: AuthService, private _router: Router) {

  }
  searchText: string = '';

  ngOnInit(): void {
    this.userId = Number(this._authService.getLoggedInUserId());
    this._leaveService.getLeaveByUserId(this.userId).subscribe(data => {
      this.leaveHistory = data.response;

      console.log(data.response);

    })

  }

  get filteredData() {
    return this.leaveHistory.filter(item =>
      item.managerComments?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.leaveType?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.status?.toLowerCase().includes(this.searchText.toLowerCase())||
      item.userId?.toString().includes(this.searchText.toString())      
    );
  }
  LeaveDetail(id?: number) {

    this._router.navigate(['/leave-request-details', id]);

  }  
}
