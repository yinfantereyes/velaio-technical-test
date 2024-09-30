import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private apiUrl = 'http://localhost:3000/tasks';

    constructor(private http: HttpClient) {
    }

    getTasks(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    getTask(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    createTask(task: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, task);
    }

    updateTask(id: string, task: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, task);
    }

    deleteTask(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

}
