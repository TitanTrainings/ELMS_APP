import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Leave } from 'src/app/models/leave.model';
import { AuthService } from 'src/app/services/auth.service';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'leave-request-details',
  templateUrl: './leave-request-details.component.html',
  styleUrl: './leave-request-details.component.css'
})
export class LeaveRequestDetailsComponent {

  public leaveDetail: Leave = new Leave();
  constructor(private leaveService: LeaveService, private _router: ActivatedRoute, private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    const leaveId = this._router.snapshot.paramMap.get('id');
    if (leaveId) {
      this.leaveService.getLeaveById(Number(leaveId)).subscribe(data => {
        let startDat = this.datePipe.transform(data.response.startDate, "yyyy-MM-dd");
        let endDatDat = this.datePipe.transform(data.response.endDate, "yyyy-MM-dd");
        this.leaveDetail = data.response;
      }, error => console.log(error));
    }
  }



}

