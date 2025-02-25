import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { Leave } from 'src/app/models/leave.model';
import { LeaveService } from 'src/app/services/leave.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-manager-leave-comment',  
  templateUrl: './manager-leave-comment.component.html',
  styleUrl: './manager-leave-comment.component.css'
})
export class ManagerLeaveCommentComponent implements OnInit{

  id: number = 0;
  public leave: Leave = new Leave(); 

  formData = {
    fromDate: '',
    toDate: '',
    comment: '',
    leaveType: ''
  };

  constructor(private _route: ActivatedRoute,private _router: Router,private _leaveService: LeaveService,private datePipe: DatePipe){    
  }

  ngOnInit(){
    this.id = this._route.snapshot.params['id'];
        
    this._leaveService.getLeaveById(this.id).subscribe( data => {
      var startDat = this.datePipe.transform(data.response.startDate,"yyyy-MM-dd");
      var endDatDat = this.datePipe.transform(data.response.endDate,"yyyy-MM-dd");
      this.formData.comment = data.response.managerComments;
      this.formData.leaveType = data.response.leaveType;
      this.formData.fromDate = startDat != null ? startDat : '';
      this.formData.toDate = endDatDat != null ? endDatDat : '';
      
    });

  }
 
  onSubmit(form: any){
    this.leave.leaveRequestId = this.id;
    this.leave.managerComments = this.formData.comment;    
    // update the below function as per requirement.
    this._leaveService.addManagerComment(this.leave).subscribe(data => {
      alert("comment added successfully !");
      this._router.navigate(['/leave-approval']);
    })
  }

}
