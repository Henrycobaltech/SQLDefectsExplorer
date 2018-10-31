import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PullRequestListItemComponent } from './pull-request-list-item.component';

describe('PullRequestListItemComponent', () => {
  let component: PullRequestListItemComponent;
  let fixture: ComponentFixture<PullRequestListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PullRequestListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullRequestListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
