package by.bsu.practice.task12.dao.collection;

import by.bsu.practice.task12.dao.DAOException;
import by.bsu.practice.task12.entity.Post;

import java.util.Date;
import java.util.List;

public interface PostCollectionDAO {
    List<Post> get(int skip, int top) throws DAOException;
    List<Post> filter(String author, Date dateFrom, Date dateTo, List<String> hashTags) throws DAOException;
}
