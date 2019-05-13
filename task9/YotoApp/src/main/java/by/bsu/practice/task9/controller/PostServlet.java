package by.bsu.practice.task9.controller;
import by.bsu.practice.task9.entity.Post;
import by.bsu.practice.task9.entity.User;
import by.bsu.practice.task9.logic.PostCollection;
import by.bsu.practice.task9.logic.UserCollection;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class PostServlet extends HttpServlet {

    public static PostCollection storage = PostCollection.POST_COLLECTION;
    public static UserCollection users = UserCollection.USER_COLLECTION;


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id = req.getParameter("id");
        Post post;
        post = storage.get(id);
        resp.getOutputStream().println(post.toString());
    }

    @Override

    protected void doPost(HttpServletRequest req, HttpServletResponse resp){
        String id =  new Date().toString();
        String description = req.getParameter("description");
        Date createdAt = new Date();
        User currentUser = users.getCurrentUser();
        if(currentUser!=null) {
            String author = currentUser.getLogin();
            String photoLink = req.getParameter("photoLink");
            List<String> likes = new ArrayList<>();
            String[] hashTags = null;
            String tagString = req.getParameter("hashTags");
             if (tagString != null) {
                hashTags = tagString.trim().split(" ");
                for (int i = 0; i < hashTags.length; i++) {
                    StringBuffer temp = new StringBuffer(hashTags[i]);
                    temp.insert(0, "#");
                    hashTags[i] = temp.toString();
                }
             }
            ArrayList<String> tagsForPost = new ArrayList<>();
            Collections.addAll(tagsForPost, hashTags);
            Post elem = new Post(id, description, createdAt, author, photoLink, likes, tagsForPost);
            storage.add(elem);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp){
        User currentUser = users.getCurrentUser();
        if(currentUser!=null) {
            String id = req.getParameter("id");
            Post postToDelete = storage.get(id);
            storage.delete(postToDelete);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp){
        String id = req.getParameter("id");
        String description = req.getParameter("description");
        String[] hashTags = null;
        String tagString = req.getParameter("hashTags");
        User currentUser = users.getCurrentUser();
        if(currentUser!=null) {
            if (tagString != null && !tagString.isEmpty()) {
                hashTags = tagString.trim().split(" ");
                for (int i = 0; i < hashTags.length; i++) {
                    StringBuffer temp = new StringBuffer(hashTags[i]);
                    temp.insert(0, "#");
                    hashTags[i] = temp.toString();
                }
            }
            ArrayList<String> tagsForPost = new ArrayList<>();
            Collections.addAll(tagsForPost, hashTags);
            storage.edit(id, new Post(description, tagsForPost));
        }
    }

}
