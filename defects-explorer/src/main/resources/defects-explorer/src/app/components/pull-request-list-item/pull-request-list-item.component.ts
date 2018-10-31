import { Component, OnInit, Input } from '@angular/core';
import { PullRequest } from 'src/app/models/PullRequest';

@Component({
  selector: 'pull-request-list-item',
  templateUrl: './pull-request-list-item.component.html',
  styleUrls: ['./pull-request-list-item.component.scss']
})
export class PullRequestListItemComponent implements OnInit {

  @Input()
  pullRequest: PullRequest;

  constructor() { }

  ngOnInit() {
  }

}
