package cn.edu.sustc.cse.sql.defectsexplorer.entities;

import java.util.Date;

public class Comment {
    private String body;
    private Date createdAt;
    private Date updatedAt;

    public String getBody() {
        return body;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }
}
