package by.bsu.practice.task9.logic;

import by.bsu.practice.task9.entity.Post;

import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public enum PostCollection {

    POST_COLLECTION;

    public static final int START = 0;
    public static final int FINISH = 10;
    public static final String AUTHOR = "author";
    public static final String DATE_FROM = "dateFrom";
    public static final String DATE_TO = "dateTo";
    public static final String HASH_TAGS = "hashTags";
    List<Post> posts = new ArrayList<>();
    int currentCount = FINISH;
    Map<String, Object> filterConfig = new HashMap<>();

    PostCollection(){
        List<String> likes = new ArrayList<>();
        likes.add("Sasha");
        likes.add("Masha");
        List<String> likes1 = new ArrayList<>(likes);
        List<String> likes2 = new ArrayList<>(likes);
        List<String> likes3 = new ArrayList<>(likes);
        List<String> likes4 = new ArrayList<>(likes);
        List<String> likes5 = new ArrayList<>(likes);
        List<String> likes6 = new ArrayList<>(likes);
        List<String> likes7 = new ArrayList<>(likes);
        List<String> likes8 = new ArrayList<>(likes);
        List<String> likes9 = new ArrayList<>(likes);
        List<String> likes10 = new ArrayList<>(likes);
        List<String> likes11 = new ArrayList<>(likes);
        List<String> likes12 = new ArrayList<>(likes);
        List<String> hashTags = new ArrayList<>();
        hashTags.add("#hello");
        hashTags.add("#day");
        List<String> hashTags1 = new ArrayList<>(hashTags);
        hashTags1.add("#bye");
        List<String> hashTags2 = new ArrayList<>(hashTags);
        hashTags2.add("#bye");
        List<String> hashTags3 = new ArrayList<>(hashTags);
        hashTags3.add("#bye");
        List<String> hashTags4 = new ArrayList<>(hashTags);
        hashTags4.add("#bye");
        hashTags4.add("#good");
        List<String> hashTags5 = new ArrayList<>(hashTags);
        hashTags5.add("#bye");
        List<String> hashTags6 = new ArrayList<>(hashTags);
        hashTags6.add("#bye");
        List<String> hashTags7 = new ArrayList<>(hashTags);
        hashTags7.add("#bye");
        List<String> hashTags8 = new ArrayList<>(hashTags);
        hashTags8.add("#bye");
        List<String> hashTags9 = new ArrayList<>(hashTags);
        hashTags9.add("#bye");
        List<String> hashTags10 = new ArrayList<>(hashTags);
        hashTags10.add("#bye");
        List<String> hashTags11 = new ArrayList<>(hashTags);
        hashTags11.add("#bye");
        List<String> hashTags12 = new ArrayList<>(hashTags);
        Calendar calendar = new GregorianCalendar(2017, 0 , 25);
        Calendar calendar1 = new GregorianCalendar(2017, 2 , 25);
        Calendar calendar2 = new GregorianCalendar(2019, 0 , 25);
        posts.add(new Post("0", "Good day", calendar.getTime(),
                "Sasha", "/resources/pictures/c.jpg",
                likes, hashTags));
        posts.add(new Post("1", "Good day", new Date(),
                "Masha", "/resources/pictures/b.jpg",
                likes1, hashTags1));
        posts.add(new Post("2", "Good day", new Date(),
                "Dasha", "/resources/pictures/f.JPG",
                likes2,  hashTags2));
        posts.add(new Post("3", "Good day", calendar1.getTime(),
                "Sasha", "/resources/pictures/g.JPG",
                likes3, hashTags3));
        posts.add(new Post("4", "Good day", calendar2.getTime(),
                "Masha", "/resources/pictures/h.jpg",
                likes4, hashTags4));
        posts.add(new Post("5", "Good day", calendar.getTime(),
                "Dasha", "/resources/pictures/j.jpg",
                likes5, hashTags5));
        posts.add(new Post("6", "Good day", new Date(),
                "Sasha", "/resources/pictures/k.jpg",
                likes6, hashTags6));
        posts.add(new Post("7", "Good day", new Date(),
                "Masha", "/resources/pictures/l.jpg",
                likes7, hashTags7));
        posts.add(new Post("8", "Good day", calendar1.getTime(),
                "Dasha", "/resources/pictures/m.jpg",
                likes8, hashTags8));
        posts.add(new Post("9", "Good day", calendar2.getTime(),
                "Sasha", "/resources/pictures/n.jpg",
                likes9, hashTags9));
        posts.add(new Post("10", "Good day", new Date(),
                "Masha", "/resources/pictures/v.jpg",
                likes10, hashTags10));
        posts.add(new Post("11", "Good day", calendar.getTime(),
                "Sasha", "/resources/pictures/x.jpg",
                likes11, hashTags11));
        posts.add(new Post("12", "Good day", new Date(),
                "Dasha", "/resources/pictures/c.jpg",
                likes12, hashTags12));
    }

    public List<Post> getPosts() {
        List<Post> finPosts;
        String author = (String)filterConfig.get(AUTHOR);
        Date dateFrom = (Date)filterConfig.get(DATE_FROM);
        Date dateTo = (Date)filterConfig.get(DATE_TO);
        List<String> hashTags = (List<String>)filterConfig.get(HASH_TAGS);
        finPosts = filter(author, dateFrom, dateTo, hashTags);
        int top = finPosts.size() < currentCount ? finPosts.size() : currentCount;
        return finPosts.subList(START, top);
    }

    public List<Post> getPosts(int skip, int top)
    {
        List<Post> finPosts;
        String author = (String)filterConfig.get(AUTHOR);
        Date dateFrom = (Date)filterConfig.get(DATE_FROM);
        Date dateTo = (Date)filterConfig.get(DATE_TO);
        List<String> hashTags = (List<String>)filterConfig.get(HASH_TAGS);
        finPosts = filter(author, dateFrom, dateTo, hashTags);
        top = finPosts.size() < top ? finPosts.size() : top;
        return finPosts.subList(skip, top);
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
            ++currentCount;
        }
    }

    public void delete(Post post){
        if(post != null){
            posts.remove(post);
            --currentCount;
        }
    }

    public void setLike(String postId, String newLike){
        Post currentPhotoPost = this.get(postId);
        if(!hasLike(postId, newLike)) {
            currentPhotoPost.getLikes().add(newLike);
        }
    }

    public boolean hasLike(String postId, String userLogin){
        Post currentPhotoPost = this.get(postId);
        return currentPhotoPost.getLikes().contains(userLogin);
    }

    public void deleteLike(String postId, String newLike){
        Post currentPhotoPost = this.get(postId);
        if(hasLike(postId, newLike)) {
            currentPhotoPost.getLikes().remove(newLike);
        }
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
        filterConfig.put(AUTHOR, author);
        filterConfig.put(DATE_FROM, dateFrom);
        filterConfig.put(DATE_TO, dateTo);
        filterConfig.put(HASH_TAGS, hashTags);
        final List<Post>[] filteredPost = new List[]{new ArrayList<>()};
        filteredPost[START].addAll(posts);
        if(author != null && !author.isEmpty()){
            filteredPost[START] = filteredPost[START]
                    .stream()
                    .filter((post) -> Pattern.matches(author, post.getAuthor()))
                    .collect(Collectors.toList());
        }
        if(dateFrom!=null){
            filteredPost[START] = filteredPost[START]
                    .stream()
                    .filter((post) -> dateFrom.before(post.getCreatedAt()))
                    .collect(Collectors.toList());
        }
        if(dateTo!=null){
            filteredPost[START] = filteredPost[START]
                    .stream()
                    .filter((post) -> dateTo.after(post.getCreatedAt()))
                    .collect(Collectors.toList());
        }
        if(hashTags!=null && !hashTags.isEmpty()){
            for (String hashTag :
                    hashTags) {
                filteredPost[START] = filteredPost[START]
                        .stream()
                        .filter((post) -> {
                            return post.getHashtags()
                                    .stream()
                                    .anyMatch(hashTag::equals);
                        }).collect(Collectors.toList());
            }
        }
        Collections.sort(filteredPost[START], Comparator.comparing(Post::getCreatedAt).reversed());
        return filteredPost[START].subList(START, filteredPost[START].size());
    }

    public int getCurrentCount() {
        return currentCount;
    }

    public void setCurrentCount(int currentCount) {
        this.currentCount = currentCount;
    }

    public int getSize() {
        return posts.size();
    }

    public void nullFilter() {
        filterConfig.clear();
    }

    public Post getLast() {
        return posts.get(posts.size()-1);
    }
}
