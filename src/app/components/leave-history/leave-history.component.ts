import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-leave-history', 
  templateUrl: './leave-history.component.html',
  styleUrl: './leave-history.component.css'
})
export class LeaveHistoryComponent {

  constructor(private authService: AuthService, private _router: Router) {
    
      }
      searchText: string = '';
      
  // Sample data for the table
  // this data should be shown on the basis of loggedin user.
  //if manager is logged in than all employee leave history should be shown.
  // if employee is logged in than leave history for that employee should be shown.
  data = [
    { id: 1, name: 'John Doe',fromDate: '11-02-2025', toDate: '12-02-2025',email: 'john@gmail.com', comment: '', status: '' },
    { id: 1, name: 'Mark',fromDate: '15-02-2025', toDate: '16-02-2025',email: 'mark@hotmail.com', comment: '', status: '' },
    { id: 1, name: 'Kris',fromDate: '21-02-2025', toDate: '22-02-2025',email: 'kris@yahoo.com', comment: '', status: '' },
    { id: 1, name: 'Mathew',fromDate: '27-02-2025', toDate: '28-02-2025',email: 'mathew@outlook.com', comment: '', status: '' },
    { id: 1, name: 'Arnold',fromDate: '03-03-2025', toDate: '04-03-2025',email: 'arnold@ibm.com', comment: '', status: '' }
  ];

  get filteredData() {
    return this.data.filter(item => 
      item.name.toLowerCase().includes(this.searchText.toLowerCase()) || 
      item.email.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
      LeaveDetail(id?: number){


      } 

}
