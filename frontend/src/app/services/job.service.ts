import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Job {
  jobId: number,
  company: string,
  role: string,
  location: string,
  format: string,
  status: string,
  dateApplied: string,
  notes: string,
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(
    private http: HttpClient,
  ) { }
  private apiUrl = '/jobs';

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJobById(jobId: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${jobId}`);
  }

  addJob(job: Partial<Job>): Observable<any> {
    return this.http.post(this.apiUrl, job);
  } 

  updateJob(jobId: number, job: Partial<Job>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${jobId}`, job);
  }

  deleteJob(jobId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${jobId}`);
  }
}