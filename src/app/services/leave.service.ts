import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Leave } from '../models/leave.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root'
})

export class LeaveService {

    private apiUrl = environment.apiUrl;
    
    constructor(private _httpClient: HttpClient) {

    }

    getPendingLeaves(): Observable<any> {

        return this._httpClient.get<any>(this.apiUrl + 'Leave/getPendingLeaves');
    }
    
    getLeaveByUserId(userId?: number): Observable<any> {

        return this._httpClient.get<any>(this.apiUrl + 'Leave/GetLeaveRequests/' + userId);
    }

    getLeaveById(Id?: number): Observable<any> {

        return this._httpClient.get<any>(this.apiUrl + 'Leave/GetLeaveRequestById/' + Id);
    }

    addLeave(_leave: Leave): Observable<any> {

        return this._httpClient.post<any>(this.apiUrl + 'Leave/CreateLeaveRequest/', _leave);
    }

    addManagerComment(_leave: Leave): Observable<any> {

        return this._httpClient.put<any>(this.apiUrl + 'Leave/addManagerComment/', _leave);
    }

    approveLeave(id?: number, approve?: boolean): Observable<any> {

        return this._httpClient.put<any>(this.apiUrl + 'Leave/approve/' + id, approve);
    }

    rejectLeave(id?: number, reject?: boolean): Observable<any> {

        return this._httpClient.put<any>(this.apiUrl + 'Leave/reject/' + id, reject);
    }

    deleteLeave(id?: number): Observable<any> {

        return this._httpClient.delete<any>(this.apiUrl + 'Leave/' + id);
    }
}