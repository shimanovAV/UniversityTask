package by.bsu.practice.task12.dao.user;

import by.bsu.practice.task12.dao.DAOException;
import by.bsu.practice.task12.dao.connector.DataBaseHelper;
import by.bsu.practice.task12.entity.User;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class SQLUserDAO implements UserDAO {

    private static final String SELECT = "SELECT * FROM user where NAME = ? AND PASSWORD = ?";

    private DataBaseHelper helper = new DataBaseHelper();

   public boolean has(User user) throws DAOException{
       PreparedStatement statement = null;
       ResultSet rs;
       try {
           helper.setQuery(SELECT);
           statement = helper.getPreparedStatement();
           statement.setString(1, user.getLogin());
           statement.setString(2, user.getPassword());
           rs = statement.executeQuery();
           return rs.next();
       } catch (SQLException e) {
           throw new DAOException(e);
       } finally {
           helper.close(statement);
       }
   }
}
