package by.bsu.practice.task9.controller;

import by.bsu.practice.task9.entity.User;
import by.bsu.practice.task9.logic.UserCollection;
import com.google.gson.Gson;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class UserServlet extends HttpServlet {

    public static UserCollection users = UserCollection.USER_COLLECTION;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String login = req.getParameter("login");
        String password = req.getParameter("password");
        if (login != null && password != null) {
            User user = new User(login, password);
            if (users.has(user)) {
                users.setCurrentUser(user);
                Gson gson = new Gson();
                String answer = gson.toJson(users.getCurrentUser());
                resp.getOutputStream().print(answer);
            }
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        User user = users.getCurrentUser();
        users.removeCurrentUser(user);
        Gson gson = new Gson();
        String answer = gson.toJson(users.getCurrentUser());
        resp.getOutputStream().print(answer);

    }
}

