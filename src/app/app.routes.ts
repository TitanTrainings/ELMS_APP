import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LeaveApprovalComponent } from './components/leave-approval/leave-approval.component';
import { LeaveApplyComponent } from './components/leave-apply/leave-apply.component';
import { LeaveBalanceComponent } from './components/leave-balance/leave-balance.component';
import { LeaveHistoryComponent } from './components/leave-history/leave-history.component';
import { RoleGuard } from './guards/roleGuard';
import { UnAuthorizePageComponent } from './components/un-authorize-page/un-authorize-page.component';
import { AuthGuard } from './guards/authGuard';
import { ManagerLeaveCommentComponent } from './components/manager-leave-comment/manager-leave-comment.component';


export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },      
    { path: 'leave-apply', component: LeaveApplyComponent , canActivate: [RoleGuard],data:{role: 'employee'}},
    { path: 'leave-approval', component: LeaveApprovalComponent,canActivate: [RoleGuard],data: { role: 'manager' } }, 
    { path: 'leave-balance', component: LeaveBalanceComponent,canActivate: [RoleGuard],data: { role: 'employee' } },
    { path: 'leave-history', component: LeaveHistoryComponent, canActivate: [AuthGuard]},
    { path: 'leave-comment/:id', component: ManagerLeaveCommentComponent,canActivate: [RoleGuard],data: { role: 'manager' }},
    { path: 'un-authorized', component: UnAuthorizePageComponent },
    { path: '**', component: LoginComponent} 
];
