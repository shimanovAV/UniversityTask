package by.bsu.practice.task12.dao.user;

import by.bsu.practice.task12.dao.DAOException;
import by.bsu.practice.task12.entity.User;

public interface UserDAO {
    boolean has(User user) throws DAOException;
}
