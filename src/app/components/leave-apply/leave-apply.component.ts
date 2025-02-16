import { Component, OnInit } from '@angular/core';
import { Leave } from '../../models/leave.model';
import { LeaveService } from '../../services/leave.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-apply',  
  templateUrl: './leave-apply.component.html',
  styleUrl: './leave-apply.component.css'
})
export class LeaveApplyComponent implements OnInit {
  currentDate: string = '';

  formData = {
    fromDate: '',
    toDate: '',
    comment: '',
    leavetype: ''
  };

  leaveTypes = [
    { value: '1', label: 'Sick' },
    { value: '2', label: 'Vacation' }
  ];

  getMinDate(): string {
    const today = new Date();
    // Format the date to YYYY-MM-DD
    return today.toISOString().split('T')[0];
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted:', this.formData);
    } else {
      console.log('Form is invalid');
    }
  }
  _leave: Leave = new Leave();
  constructor(private employeeService: LeaveService,
    private router: Router) { }

  ngOnInit(): void {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  }

  saveLeave(){
       this._leave.startDate = new Date(this.formData.fromDate);
       this._leave.endDate = new Date(this.formData.toDate);
       this._leave.leaveType = this.formData.leavetype;
              
    this.employeeService.addLeave(this._leave).subscribe( data =>{
      console.log(data);
      this.goToLeaveList();
    },
    error => console.log(error));
  }

  goToLeaveList(){
    this.router.navigate(['/leave-history']);
  }
    
}
