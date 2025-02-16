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

    getLeaves(): Observable<Leave[]> {

        return this._httpClient.get<Leave[]>(this.apiUrl + 'Leave');
    }

    getLeaveById(id?: number): Observable<Leave> {

        return this._httpClient.get<Leave>(this.apiUrl + '/Leave/' + id);
    }

    addLeave(_leave: Leave): Observable<Leave> {

        return this._httpClient.post<Leave>(this.apiUrl + 'Leave/', _leave);
    }

    editLeave(id: number, _leave: Leave): Observable<Leave> {

        return this._httpClient.put<Leave>(this.apiUrl + 'Leave/' + id, _leave);
    }

    approveLeave(id: number, approve: boolean): Observable<Leave> {

        return this._httpClient.put<Leave>(this.apiUrl + 'Leave/' + id, approve);
    }

    deleteLeave(id?: number): Observable<any> {

        return this._httpClient.delete<any>(this.apiUrl + 'Leave/' + id);
    }
}