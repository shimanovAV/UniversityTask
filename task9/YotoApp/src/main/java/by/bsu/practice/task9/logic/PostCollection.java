package by.bsu.practice.task9.logic;

import by.bsu.practice.task9.entity.Post;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public enum PostCollection {

    POST_COLLECTION;

    public static final int START = 0;
    public static final int FINISH = 10;
    List<Post> posts = new ArrayList<>();

    PostCollection(){
        List<String> likes = new ArrayList<>();
        likes.add("Sasha");
        likes.add("Masha");
        List<String> likes1 = new ArrayList<>();
        likes1.add("Sasha");
        likes1.add("Masha");
        List<String> likes2 = new ArrayList<>();
        likes2.add("Sasha");
        likes2.add("Masha");
        List<String> hashTags = new ArrayList<>();
        hashTags.add("#good");
        hashTags.add("#day");
        List<String> hashTags2 = new ArrayList<>();
        hashTags2.add("#good");
        hashTags2.add("#day");
        List<String> hashTags1 = new ArrayList<>();
        hashTags1.add("#good");
        hashTags1.add("#day");
        posts.add(new Post("32", "Good day", new Date(),
                "Sasha", "/pictures",
                likes1, hashTags1));
        posts.add(new Post("38", "Good day", new Date(),
                "Sasha", "/pictures",
                likes, hashTags));
        posts.add(new Post("92", "Good day", new Date(),
                "Sasha", "/pictures",
                likes2,  hashTags2));
    }

    public List<Post> getPosts() {
        int top = posts.size() < FINISH ? posts.size() : FINISH;
        return posts.subList(START, top);
    }

    public List<Post> getPosts(int skip, int top) {
        return posts.subList(skip, top);
    }

    public Post get(String id){
        Post findPost = new Post();
        if(id!=null && !id.isEmpty()){
           findPost =  posts.stream()
                   .filter((post) -> post.getId().equals(id))
                   .findFirst()
                   .get();
        }
        return findPost;
    }

    public void add(Post post) {
        if (post != null) {
            posts.add(post);
        }
    }

    public void delete(Post post){
        if(post != null){
            posts.remove(post);
        }
    }

    public void setLike(String postId, String newLike){
        Post currentPhotoPost = this.get(postId);
         currentPhotoPost.getLikes().add(newLike);
    }

    public void deleteLike(String postId, String newLike){
        Post currentPhotoPost = this.get(postId);
        currentPhotoPost.getLikes().remove(newLike);
    }

    public void edit(String postId, Post newPost) {
        Post currentPhotoPost = this.get(postId);
        newPost.setId(currentPhotoPost.getId());
        newPost.setCreatedAt(currentPhotoPost.getCreatedAt());
        newPost.setAuthor(currentPhotoPost.getAuthor());
        newPost.setPhotoLink(currentPhotoPost.getPhotolink());
        newPost.setLikes(currentPhotoPost.getLikes());
        this.delete(currentPhotoPost);
        this.add(newPost);
    }

    public List<Post> filter(String author, Date dateFrom, Date dateTo, List<String> hashTags){
        final List<Post>[] filteredPost = new List[]{new ArrayList<>()};
        filteredPost[0].addAll(posts);
        if(author != null && !author.isEmpty()){
            filteredPost[0] = filteredPost[0]
                    .stream()
                    .filter((post) -> Pattern.matches(author, post.getAuthor()))
                    .collect(Collectors.toList());
        }
        if(dateFrom!=null){
            filteredPost[0] = filteredPost[0]
                    .stream()
                    .filter((post) -> dateFrom.before(post.getCreatedAt()))
                    .collect(Collectors.toList());
        }
        if(dateTo!=null){
            filteredPost[0] = filteredPost[0]
                    .stream()
                    .filter((post) -> dateTo.after(post.getCreatedAt()))
                    .collect(Collectors.toList());
        }
        if(hashTags!=null && !hashTags.isEmpty()){
            hashTags.stream().forEach((hashTag) -> {
                 filteredPost[0] = filteredPost[0]
                        .stream()
                        .filter((post) -> {
                            return post.getHashtags()
                                    .stream()
                                    .anyMatch(hashTag::equals);
                        }).collect(Collectors.toList());
            });
        }
        int top = filteredPost[0].size() < FINISH ? filteredPost[0].size() : FINISH;
        return filteredPost[0].subList(START, top);
    }
}
