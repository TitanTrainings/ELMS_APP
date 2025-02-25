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
  constructor(private leaveService: LeaveService, private _router: ActivatedRoute) {

  }

  ngOnInit(): void {
    const leaveId = this._router.snapshot.paramMap.get('id');
    if (leaveId) {
      this.leaveService.getLeaveById(Number(leaveId)).subscribe(data => {
        this.leaveDetail = data.response;
      }, error => console.log(error));      
    }
  }

  
    
  }

