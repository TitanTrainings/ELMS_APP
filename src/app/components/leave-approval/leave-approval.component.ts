import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-leave-approval', 
  templateUrl: './leave-approval.component.html',
  styleUrl: './leave-approval.component.css'
})
export class LeaveApprovalComponent {

  constructor(private authService: AuthService, private _router: Router) {
  
    }

  searchText: string = '';
  // Sample data for the table
  data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Michael Johnson', email: 'michael@example.com' },
    { id: 4, name: 'Sarah Lee', email: 'sarah@example.com' },
    { id: 5, name: 'David Brown', email: 'david@example.com' }
  ];

  get filteredData() {
    return this.data.filter(item => 
      item.name.toLowerCase().includes(this.searchText.toLowerCase()) || 
      item.email.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  ApproveLeave(id?: number){
    if(confirm("Are you sure you want to approve ?"))
      {
        alert(id);
      }
    //this._router.navigate(['/productDetail', id]);
  }

  RejectLeave(id?: number){
    if(confirm("Are you sure you want to reject ?"))
      {
        alert(id);
      }
    //this._routerrouter.navigate(['/edit-product', id]);
  }

  CommentLeave(id?: number){
    this._router.navigate(['/leave-comment', id]);
    
  }


}
