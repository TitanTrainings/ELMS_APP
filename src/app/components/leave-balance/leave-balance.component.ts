import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveBalance } from 'src/app/models/leave-balance';
import { Leave } from 'src/app/models/leave.model';
import { AuthService } from 'src/app/services/auth.service';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrl: './leave-balance.component.css'
})
export class LeaveBalanceComponent implements OnInit{

  userId: number = 0;
  public _leaveBalance: LeaveBalance = new LeaveBalance();

constructor(private _leaveService: LeaveService, private _authService: AuthService, private _router: Router) {
  }

  ngOnInit(): void {
    this.userId = Number(this._authService.getLoggedInUserId());
    this._leaveService.getLeaveBalance(this.userId).subscribe(data => {
      console.log(data.response);
      this._leaveBalance = data.response;
    })
  }
}
