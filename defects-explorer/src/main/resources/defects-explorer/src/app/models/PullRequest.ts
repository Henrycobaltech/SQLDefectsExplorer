import { Comment } from './Comment';

export class PullRequest {
    id: number;
    reportId: number;
    repoName: string;
    title: string;
    body: string;
    updatedAt: Date;
    commiteCount: number;
    createdAt: Date;
    merged: boolean;
    mergedAt: Date;
    issueNumber: number;
    state: string;
    changedFiles: number;
    headSha: string;
    comments: Array<Comment>;
}
