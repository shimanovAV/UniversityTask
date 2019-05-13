package by.bsu.practice.task9.controller;

import by.bsu.practice.task9.entity.Post;
import by.bsu.practice.task9.logic.PostCollection;
import com.google.gson.Gson;

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

public class PostCollectionServlet extends HttpServlet {

    public static final int START = 0;
    public static final int TOP = 10;
    public static final String DATE_FORMAT = "yyyy-MM-dd";
    public static PostCollection storage = PostCollection.POST_COLLECTION;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException{
        String skipString = req.getParameter("skip");
        int skip = skipString == null && skipString.equals("") ? START
                : Integer.parseInt(skipString);
        String topString = req.getParameter("top");
        int top = topString == null && topString.equals("") ? TOP
                : Integer.parseInt(topString);
        List<Post> pagePost = storage.getPosts(skip, top);
        Gson gson = new Gson();
        String answer = gson.toJson(pagePost);
        resp.getOutputStream().print(answer);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            String author = req.getParameter("author");
            String dateFromString = req.getParameter("dateFrom");
            String dateToString = req.getParameter("dateTo");
            String hashTagsString = req.getParameter("hashTags");
            Date dateFrom = null, dateTo = null;
            if (dateFromString != null && !dateFromString.isEmpty()) {
                dateFrom = new SimpleDateFormat(DATE_FORMAT).parse(dateFromString);
            }
            if (dateToString != null && !dateToString.isEmpty()) {
                dateTo = new SimpleDateFormat(DATE_FORMAT).parse(dateToString);
            }
            String[] hashTags = null;
            if (hashTagsString != null && !hashTagsString.isEmpty()) {
                    hashTags = hashTagsString.trim().split(" ");
                    for (int i = 0; i < hashTags.length; i++) {
                        StringBuffer temp = new StringBuffer(hashTags[i]);
                        temp.insert(0, "#");
                        hashTags[i] = temp.toString();
                    }
            }
            ArrayList<String> tagsForPost = new ArrayList<>();
            if(hashTags!=null){
                Collections.addAll(tagsForPost, hashTags);
            }
            List<Post> pagePost = storage.filter(author, dateFrom, dateTo, tagsForPost);
            Gson gson = new Gson();
            String answer = gson.toJson(pagePost);
            resp.getOutputStream().print(answer);
        } catch (ParseException e){
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}
