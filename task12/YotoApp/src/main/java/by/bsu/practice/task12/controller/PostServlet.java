package by.bsu.practice.task12.controller;
import by.bsu.practice.task12.dao.DAOException;
import by.bsu.practice.task12.dao.post.PostDAO;
import by.bsu.practice.task12.dao.post.SQLPostDAO;
import by.bsu.practice.task12.entity.Post;
import by.bsu.practice.task12.entity.User;
import by.bsu.practice.task12.logic.PostCollection;
import by.bsu.practice.task12.logic.UserCollection;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@MultipartConfig

public class PostServlet extends HttpServlet {

    public static final String ID = "id";
    public static final String DESCRIPTION = "description";
    public static final String INPUT_NAME_FOR_FILE = "fileInput";
    public static final String PATH_TO_PICTURES = "/resources/pictures/";
    public static final String HASH_TAGS = "hashTags";
    public static PostCollection storage = PostCollection.POST_COLLECTION;
    public static UserCollection users = UserCollection.USER_COLLECTION;
    public static final String REGEX = "#";
    public static final int START = 0;
    public static final int OFFSET = 1;

    PostDAO postDAO = new SQLPostDAO();


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id = req.getParameter(ID);
        int intId = 0;
        Post post = new Post();
        try {
            if (id != null && !id.isEmpty()) {
                intId = Integer.parseInt(id);
                post = postDAO.get(intId);
            }
        } catch (DAOException e){
            e.printStackTrace();
        }
        Gson gson = new Gson();
        String answer = gson.toJson(post);
        PrintWriter out = resp.getWriter();
        out.print(answer);
    }

    @Override

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        try{
        int currentId = postDAO.getLastId();
        String id =  String.valueOf(currentId + OFFSET);
        String description = req.getParameter(DESCRIPTION);
        Date createdAt = new Date();
        User currentUser = users.getCurrentUser();
        if(currentUser!=null) {
            String author = currentUser.getLogin();
            String photoLink = null;
            Part part = req.getPart(INPUT_NAME_FOR_FILE);
            Files.copy(part.getInputStream(), Paths.get(getServletContext().getRealPath("/resources/pictures"),
                    id + part.getSubmittedFileName()));
            photoLink = PATH_TO_PICTURES + id + part.getSubmittedFileName();
            List<String> likes = new ArrayList<>();
            String[] hashTags;
            ArrayList<String> tagsForPost = new ArrayList<>();
            String hashTagsString = req.getParameter(HASH_TAGS);
            if (hashTagsString != null && !hashTagsString.isEmpty()) {
                hashTags = hashTagsString.trim().split(REGEX);
                if (hashTags != null) {
                    Collections.addAll(tagsForPost, hashTags);
                }
                for (int i = OFFSET; i < tagsForPost.size(); ++i) {
                    StringBuffer temp = new StringBuffer(tagsForPost.get(i));
                    temp.insert(START, REGEX);
                    tagsForPost.set(i - OFFSET, temp.toString());
                }
                tagsForPost.remove(tagsForPost.size() - OFFSET);
            }
            Post elem = new Post(id, description, createdAt, author, photoLink, likes, tagsForPost);
            postDAO.add(elem, users.getCurrentUser());
            Gson gson = new Gson();
            String answer = gson.toJson(postDAO.get(currentId + OFFSET));
            resp.getOutputStream().print(answer);
        }
        }catch (DAOException e){
            e.printStackTrace();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException{
        User currentUser = users.getCurrentUser();
        if(currentUser!=null) {
            String id = req.getParameter(ID);
            Post postToDelete = storage.get(id);
            storage.delete(postToDelete);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException{
        Gson gson = new Gson();
        String id = req.getParameter(ID);
        String description = req.getParameter(DESCRIPTION);
        String[] hashTags;
        ArrayList<String> tagsForPost = new ArrayList<>();
        String tagString = req.getParameter(HASH_TAGS);
        User currentUser = users.getCurrentUser();
        if(currentUser!=null) {
            if (tagString != null && !tagString.isEmpty()) {
                hashTags = tagString.trim().split(REGEX);
                if (hashTags != null) {
                    Collections.addAll(tagsForPost, hashTags);
                }
                for (int i = OFFSET; i<tagsForPost.size(); ++i){
                    StringBuffer temp = new StringBuffer(tagsForPost.get(i));
                    temp.insert(START, REGEX);
                    tagsForPost.set(i-OFFSET, temp.toString());
                }
                tagsForPost.remove(tagsForPost.size()-OFFSET);
            }
            storage.edit(id, new Post(description, tagsForPost));
            String answer = gson.toJson(storage.get(id));
            resp.getOutputStream().print(answer);
        }
    }

}
