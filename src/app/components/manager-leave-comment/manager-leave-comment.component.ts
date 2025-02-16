import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Leave } from 'src/app/models/leave.model';
import { LeaveService } from 'src/app/services/leave.service';

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
    leavetype: ''
  };

  constructor(private _route: ActivatedRoute,private _leaveService: LeaveService){    
  }

  ngOnInit(){
    this.id = this._route.snapshot.params['id'];
        
    this._leaveService.getLeaveById(this.id).subscribe( data => {
      this.leave = data;
    });

  }
 
  onSubmit(form: any){
    console.log(this.leave);
    console.log(this.formData);
    // update the below function as per requirement.
    this._leaveService.editLeave(1,this.leave);
  }

}
