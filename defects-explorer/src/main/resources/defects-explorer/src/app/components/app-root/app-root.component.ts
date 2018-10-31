import { Component, OnInit } from '@angular/core';
import { PullRequestsService } from 'src/app/services/pullrequests.service';
import { PullRequest } from 'src/app/models/PullRequest';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent implements OnInit {

  pullRequests: PullRequest[] = [];

  constructor(private prService: PullRequestsService) { }

  ngOnInit() {
    this.prService.getPullRequests().subscribe(items => {
      this.pullRequests = items;
      console.log(items);
    });
  }

}
