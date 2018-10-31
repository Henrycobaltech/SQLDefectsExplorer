import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PullRequest } from '../models/PullRequest';

@Injectable()
export class PullRequestsService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  getPullRequests(): Observable<PullRequest[]> {
    return this.httpClient.get<PullRequest[]>(this.apiUrl + '/pull-requests');
  }
}
