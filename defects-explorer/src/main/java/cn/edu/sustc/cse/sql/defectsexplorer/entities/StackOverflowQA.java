package cn.edu.sustc.cse.sql.defectsexplorer.entities;

import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

public class StackOverflowQA {
    private ObjectId id;
    private String title;
    private String body;
    private List<String> tags;
    private int questionScore;
    private int questionFavoriate;
    private String answer;
    private int answerScore;
    private int answerFavoriate;
    private int viewCount;
    private int upvotes;
    private int downvotes;

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


    public String getAnswer() {
        return answer;
    }

    public int getAnswerScore() {
        return answerScore;
    }

    public int getAnswerFavoriate() {
        return answerFavoriate;
    }


    public int getViewCount() {
        return viewCount;
    }

    public int getUpvotes() {
        return upvotes;
    }

    public int getDownvotes() {
        return downvotes;
    }


}
