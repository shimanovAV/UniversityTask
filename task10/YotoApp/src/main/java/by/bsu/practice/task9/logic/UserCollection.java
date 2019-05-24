package by.bsu.practice.task9.logic;

import by.bsu.practice.task9.entity.User;

import java.util.ArrayList;
import java.util.List;

public enum UserCollection {

    USER_COLLECTION;

    List<User> users = new ArrayList<>();
    User currentUser = null;

    UserCollection() {
        users.add(new User("Sasha", "Sasha"));
        users.add(new User("Dasha", "Dasha"));
        users.add(new User("Masha", "Masha"));
    }

    public List<User> getUsers() {
        return users;
    }

    public User getCurrentUser() {
        return currentUser;
    }

    public boolean has(User user){
        return users
                .stream()
                .anyMatch(user :: equals);
    }

    public void setCurrentUser(User user){
        if(user!=null) {
            currentUser = user;
        }
    }

    public void removeCurrentUser(User user){
        if(user!=null) {
            currentUser = null;
        }
    }
}
