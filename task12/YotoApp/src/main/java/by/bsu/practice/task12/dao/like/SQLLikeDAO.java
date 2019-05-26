package by.bsu.practice.task12.dao.like;

import by.bsu.practice.task12.dao.DAOException;
import by.bsu.practice.task12.dao.connector.DataBaseHelper;
import by.bsu.practice.task12.dao.post.PostDAO;
import by.bsu.practice.task12.dao.post.SQLPostDAO;
import by.bsu.practice.task12.entity.Post;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class SQLLikeDAO implements LikeDAO {

    private static final String SELECT_USER = "SELECT USER_ID FROM user WHERE NAME = ?";
    private static final String INSERT = "INSERT INTO likes (POST_ID, USER_ID) VALUES (?, ?)";
    private static final String DELETE = "DELETE FROM likes WHERE POST_ID = ? AND USER_ID = ?";

    private DataBaseHelper helper = new DataBaseHelper();


   public boolean add(String postId, String userLogin) throws DAOException{
        PreparedStatement statement = null;
        int userId, postIntId = 0;
        ResultSet rs;
        try {
            helper.setQuery(SELECT_USER);
            statement = helper.getPreparedStatement();
            statement.setString(1, userLogin);
            rs = statement.executeQuery();
            if(rs.next()){
               userId  = rs.getInt(1);
               postIntId = Integer.parseInt(postId);
                helper.setQuery(INSERT);
                statement = helper.getPreparedStatement();
                statement.setInt(1, postIntId);
                statement.setInt(2, userId);
                statement.executeUpdate();
            }
            return true;
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            helper.close(statement);
        }
    }
    public boolean delete(String postId, String userLogin) throws DAOException{
        PreparedStatement statement = null;
        int userId, postIntId = 0;
        ResultSet rs;
        try {
            helper.setQuery(SELECT_USER);
            statement = helper.getPreparedStatement();
            statement.setString(1, userLogin);
            rs = statement.executeQuery();
            if(rs.next()){
                userId  = rs.getInt(1);
                postIntId = Integer.parseInt(postId);
                helper.setQuery(DELETE);
                statement = helper.getPreparedStatement();
                statement.setInt(1, postIntId);
                statement.setInt(2, userId);
                statement.executeUpdate();
            }
            return true;
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            helper.close(statement);
        }
    }
}
