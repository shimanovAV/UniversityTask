package by.bsu.practice.task9.controller;

import by.bsu.practice.task9.entity.User;
import by.bsu.practice.task9.logic.PostCollection;
import by.bsu.practice.task9.logic.UserCollection;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LikeServlet extends HttpServlet {

    public static PostCollection storage = PostCollection.POST_COLLECTION;
    public static UserCollection users = UserCollection.USER_COLLECTION;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp){
        String id = req.getParameter("id");
        User currentUser = users.getCurrentUser();
        if(currentUser!=null) {
            String userLogin = currentUser.getLogin();
            storage.setLike(id, userLogin);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp){
        String id = req.getParameter("id");
        User currentUser = users.getCurrentUser();
        if(currentUser!=null) {
            String userLogin = currentUser.getLogin();
            storage.deleteLike(id, userLogin);
        }
    }
}
