package cn.edu.sustc.cse.sql.defectsexplorer.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class PullRequest {
    public int getId() {
        return id;
    }

    public int getRepoId() {
        return repoId;
    }

    public String getRepoName() {
        return repoName;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public int getCommitsCount() {
        return commitsCount;
    }

    public boolean isMerged() {
        return isMerged;
    }

    public Date getMergedAt() {
        return mergedAt;
    }

    public int getIssueNumber() {
        return issueNumber;
    }

    public String getState() {
        return state;
    }

    public int getChangedFiles() {
        return changedFiles;
    }

    public String getHeadSha() {
        return headSha;
    }

    public List<Comment> getComments() {
        return comments;
    }

    private int id;
    private int repoId;
    private String repoName;
    private String title;
    private String body;
    private Date updatedAt;
    private Date createdAt;
    private int commitsCount;
    private boolean isMerged;
    private Date mergedAt;
    private int issueNumber;
    private String state;
    private int changedFiles;
    private String headSha;
    private List<Comment> comments;

    public PullRequest(int id) {
        this.id = id;
        this.createdAt = new Date();
    }
}
