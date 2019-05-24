package by.bsu.practice.task9.controller;

import by.bsu.practice.task9.entity.User;
import by.bsu.practice.task9.logic.PostCollection;
import by.bsu.practice.task9.logic.UserCollection;
import com.google.gson.Gson;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@MultipartConfig
public class LikeServlet extends HttpServlet {

    public static final String ID = "id";
    public static PostCollection storage = PostCollection.POST_COLLECTION;
    public static UserCollection users = UserCollection.USER_COLLECTION;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id = req.getParameter("id");
        User currentUser = users.getCurrentUser();
        if(currentUser!=null) {
            String userLogin = currentUser.getLogin();
            boolean like = storage.hasLike(id, userLogin);
            Gson gson = new Gson();
            String answer = gson.toJson(like);
            resp.getOutputStream().print(answer);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String id = req.getParameter(ID);
        User currentUser = users.getCurrentUser();
        if(currentUser!=null) {
            String userLogin = currentUser.getLogin();
            storage.setLike(id, userLogin);
            Gson gson = new Gson();
            String answer = gson.toJson(storage.get(id));
            resp.getOutputStream().print(answer);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp)throws IOException{
        String id = req.getParameter(ID);
        User currentUser = users.getCurrentUser();
        if(currentUser!=null) {
            String userLogin = currentUser.getLogin();
            storage.deleteLike(id, userLogin);
            Gson gson = new Gson();
            String answer = gson.toJson(storage.get(id));
            resp.getOutputStream().print(answer);
        }
    }
}
