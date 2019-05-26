package by.bsu.practice.task12.dao.post;

import by.bsu.practice.task12.dao.DAOException;
import by.bsu.practice.task12.entity.Post;
import by.bsu.practice.task12.entity.User;

import java.util.List;

public interface PostDAO {
    Post get(int id) throws DAOException;
    int getLastId() throws DAOException;
    boolean add(Post post, User user) throws DAOException;
    boolean delete(int postId) throws DAOException;
    boolean update(int id, Post post) throws DAOException;
}
