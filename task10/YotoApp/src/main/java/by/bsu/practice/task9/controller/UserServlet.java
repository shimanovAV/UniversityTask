package by.bsu.practice.task9.controller;

import by.bsu.practice.task9.entity.User;
import by.bsu.practice.task9.logic.UserCollection;
import com.google.gson.Gson;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@MultipartConfig

public class UserServlet extends HttpServlet {

    public static final String LOGIN = "login";
    public static final String PASSWORD = "password";
    public static UserCollection users = UserCollection.USER_COLLECTION;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
                Gson gson = new Gson();
                String answer = gson.toJson(users.getCurrentUser());
                resp.getOutputStream().print(answer);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String login = req.getParameter(LOGIN);
        String password = req.getParameter(PASSWORD);
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

