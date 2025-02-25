import { Component, OnInit } from '@angular/core';
import { Leave } from '../../models/leave.model';
import { LeaveService } from '../../services/leave.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  styleUrl: './leave-apply.component.css'
})
export class LeaveApplyComponent implements OnInit {
  currentDate: string = '';
  errorMessage: string = '';

  formData = {
    fromDate: '',
    toDate: '',
    leavetype: ''
  };

  leaveTypes = [
    { value: 'Sick', label: 'Sick' },
    { value: 'Vacation', label: 'Vacation' }
  ];

  getMinDate(): string {
    const today = new Date();
    // Format the date to YYYY-MM-DD
    return today.toISOString().split('T')[0];
  }

  onSubmit(form: any) {
    if (form.valid) {
      var response = this.saveLeave();
      console.log('Form Submitted:', this.formData);
    } else {
      console.log('Form is invalid');
    }
  }
  _leave: Leave = new Leave();

  constructor(private leaveService: LeaveService, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  }

  saveLeave() {
    this._leave.startDate = new Date(this.formData.fromDate);
    this._leave.endDate = new Date(this.formData.toDate);
    this._leave.leaveType = this.formData.leavetype;
    console.log(this.authService.getLoggedInUserId());
    this._leave.userId = Number(this.authService.getLoggedInUserId());


    this.leaveService.addLeave(this._leave).subscribe(data => {
      console.log(data.Response);
      if (data.response != 'error') {
        this.goToLeaveList();
      }
      else {
        this.errorMessage = data.Response;
      }
    });    
  }

  goToLeaveList() {
    this.router.navigate(['/leave-history']);
  }

}
