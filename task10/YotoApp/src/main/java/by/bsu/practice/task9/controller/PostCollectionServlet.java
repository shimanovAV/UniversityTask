package by.bsu.practice.task9.controller;

import by.bsu.practice.task9.entity.Post;
import by.bsu.practice.task9.logic.PostCollection;
import com.google.gson.Gson;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@MultipartConfig

public class PostCollectionServlet extends HttpServlet {

    public static final int START = 0;
    public static final int TOP = 10;
    public static final String AUTHOR = "author";
    public static final String DATE_FROM = "dateFrom";
    public static final String DATE_TO = "dateTo";
    public static final String HASH_TAGS = "hashTags";
    public static final String DATE_FORMAT = "yyyy-MM-dd";
    public static final String REGEX = "#";
    public static final int OFFSET = 1;
    public static PostCollection storage = PostCollection.POST_COLLECTION;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException{
        List<Post> pagePost = storage.getPosts(START, storage.getCurrentCount());
        Gson gson = new Gson();
        String answer = gson.toJson(pagePost);
        resp.getOutputStream().print(answer);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            String author = req.getParameter(AUTHOR);
            String dateFromString = req.getParameter(DATE_FROM);
            String dateToString = req.getParameter(DATE_TO);
            String hashTagsString = req.getParameter(HASH_TAGS);
            Date dateFrom = null, dateTo = null;
            if (dateFromString != null && !dateFromString.isEmpty()) {
                dateFrom = new SimpleDateFormat(DATE_FORMAT).parse(dateFromString);
            }
            if (dateToString != null && !dateToString.isEmpty()) {
                dateTo = new SimpleDateFormat(DATE_FORMAT).parse(dateToString);
            }
            String[] hashTags = null;
            ArrayList<String> tagsForPost = new ArrayList<>();
            if (hashTagsString != null && !hashTagsString.isEmpty()) {
                hashTags = hashTagsString.trim().split(REGEX);
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
            List<Post> pagePost = storage.filter(author, dateFrom, dateTo, tagsForPost);
            Gson gson = new Gson();
            String answer = gson.toJson(pagePost);
            resp.getOutputStream().print(answer);
        } catch (ParseException e){
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException{
        String topString = req.getParameter("top");
        int top, pastCount;
        int storageSize = storage.getSize();
        if(topString != null && !topString.equals("")) {
            top = TOP;
            pastCount = START;
            storage.nullFilter();
        } else{
            top = storage.getCurrentCount() + TOP;
            pastCount = storage.getCurrentCount();
        }
        top = top > storageSize ?  storageSize : top;
        storage.setCurrentCount(top);
        Gson gson = new Gson();
        List<Post> temp = storage.getPosts(pastCount, storage.getCurrentCount());
        String answer = gson.toJson(temp);
        resp.getOutputStream().print(answer);
    }
}
