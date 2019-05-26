package by.bsu.practice.task12.dao.like;

import by.bsu.practice.task12.dao.DAOException;
import by.bsu.practice.task12.entity.Post;

public interface LikeDAO {
    boolean add(String postId, String userLogin) throws DAOException;
    boolean delete(String postId, String userLogin) throws DAOException;
}
