package cn.edu.sustc.cse.sql.defectsexplorer.entities;

import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class StackOverflowQA {
    private ObjectId id;
    private String title;
    private String body;
    private List<String> tags;
    private int questionScore;
    private int questionFavoriate;
//    private Date createdAt;
//    private Date closedAt;
    private String answer;
    private int answerScore;
    private int answerFavoriate;
//    private Date answeredAt;
//    private Date answerLastEditedAt;
    private int viewCount;
    private int upvotes;
    private int downvotes;
//    private String questionCode;
//    private String answerCode;

    public StackOverflowQA() {
        this.tags = new ArrayList<>();
    }

    public ObjectId getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }

    public List<String> getTags() {
        return tags;
    }

    public int getQuestionScore() {
        return questionScore;
    }

    public int getQuestionFavoriate() {
        return questionFavoriate;
    }

//    public Date getCreatedAt() {
//        return createdAt;
//    }
//
//    public Date getClosedAt() {
//        return closedAt;
//    }

    public String getAnswer() {
        return answer;
    }

    public int getAnswerScore() {
        return answerScore;
    }

    public int getAnswerFavoriate() {
        return answerFavoriate;
    }

//    public Date getAnsweredAt() {
//        return answeredAt;
//    }

//    public Date getAnswerLastEditedAt() {
//        return answerLastEditedAt;
//    }

    public int getViewCount() {
        return viewCount;
    }

    public int getUpvotes() {
        return upvotes;
    }

    public int getDownvotes() {
        return downvotes;
    }

//    public String getQuestionCode() {
//        return questionCode;
//    }

//    public String getAnswerCode() {
//        return answerCode;
//    }

}
