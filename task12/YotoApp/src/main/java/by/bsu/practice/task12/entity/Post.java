package by.bsu.practice.task12.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import org.json.simple.JSONObject;

public class Post implements Serializable {
    private static final long serialVersionUID = 62596125783780114L;

    private String id;
    private String description;
    private Date createdAt;
    private String author;
    private String photoLink;
    private List<String> likes;
    private List<String> hashTags;

    public Post() {
        id = description = author = photoLink = "";
        createdAt = new Date();
        likes = hashTags = new ArrayList<>();
    }

    public Post(String id, String description, Date createdAt,
                String author, String photoLink, List<String> likes, List<String> hashTags) {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.author = author;
        this.photoLink = photoLink;
        this.likes = likes;
        this.hashTags = hashTags;
    }

    public Post(String description, List<String> hashTags) {
        this.description = description;
        this.hashTags = hashTags;
    }

    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public String getAuthor() {
        return author;
    }

    public String getPhotolink() {
        return photoLink;
    }

    public List<String> getLikes() {
        return likes;
    }

    public List<String> getHashtags() {
        return hashTags;
    }

    public void setId(String id) {
        if (!id.isEmpty() && id != null) {
            this.id = id.trim();
        }
    }

    public void setDescription(String description) {
        if (!description.isEmpty() && description != null) {
            this.description = description.trim();
        }
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setAuthor(String author) {
        if (!author.isEmpty() && author != null) {
            this.author = author.trim();
        }
    }

    public void setPhotoLink(String photoLink) {
        if (!photoLink.isEmpty() && photoLink != null) {
            this.photoLink = photoLink;
        }
    }

    public void setLikes(List<String> likes) {
        this.likes = likes;
    }

    public void setHashTags(List<String> hashTags) {
        this.hashTags = hashTags;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Post post = (Post) o;
        return Objects.equals(id, post.id) &&
                Objects.equals(description, post.description) &&
                Objects.equals(createdAt, post.createdAt) &&
                Objects.equals(author, post.author) &&
                Objects.equals(photoLink, post.photoLink) &&
                Objects.equals(likes, post.likes) &&
                Objects.equals(hashTags, post.hashTags);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, description, createdAt, author, photoLink, likes, hashTags);
    }

    @Override
    public String toString() {
        JSONObject element = new JSONObject();
        element.put("id", id);
        element.put("description", description);
        element.put("createdAt", createdAt.toString());
        element.put("author", author);
        element.put("photoLink", photoLink);
        element.put("likes", likes.toString());
        element.put("hashTags", hashTags.toString());
        return element.toString();
    }

}

