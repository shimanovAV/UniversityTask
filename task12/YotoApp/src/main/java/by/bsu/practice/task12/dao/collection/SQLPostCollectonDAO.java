package by.bsu.practice.task12.dao.collection;

import by.bsu.practice.task12.dao.DAOException;
import by.bsu.practice.task12.dao.connector.DataBaseHelper;
import by.bsu.practice.task12.dao.post.PostDAO;
import by.bsu.practice.task12.dao.post.SQLPostDAO;
import by.bsu.practice.task12.entity.Post;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SQLPostCollectonDAO implements PostCollectionDAO {

    private static final String SELECT = "SELECT POST_ID FROM photo_post ORDER BY CREATION_DATE DESC" +
            "LIMIT ?, ?";
    private static final String FILTER = "SELECT POST_ID FROM post_tag RIGHT JOIN" +
        " photo_post ON post_tag.POST_ID = photo_post.POST_ID join tag on" +
        " post_tag.TAG_ID = tag.TAG_ID WHERE " +
    "USER_ID = ? AND " +
    "IIf(? IS NULL, CRATION_DATE > ? OR CREATION_DATE IS NULL, CRATION_DATE > ?) AND " +
    "IIf(? IS NULL, CRATION_DATE < ? OR CREATION_DATE IS NULL, CRATION_DATE < ?) AND " +
    "IIf(? IS NULL, TAG LIKE ('%?%') OR TAG IS NULL, TAG LIKE ('%?%'))";
    private static final String SELECT_USER = "SELECT USER_ID FROM user WHERE IIf(? IS NULL, NAME = ? OR NAME IS NULL, NAME = ?)";

    private DataBaseHelper helper = new DataBaseHelper();


    public List<Post> get(int skip, int top) throws DAOException{
        PreparedStatement statement = null;
        PostDAO postDAO = new SQLPostDAO();
        List<Post> posts = new ArrayList<>();
        ResultSet rs;
        try {
            helper.setQuery(SELECT);
            statement = helper.getPreparedStatement();
            statement.setInt(1, skip);
            statement.setInt(2, top);
            rs = statement.executeQuery();
            while(rs.next()){
                int postId = rs.getInt(1);
                posts.add(postDAO.get(postId));
            }
            return posts;
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            helper.close(statement);
        }
    }

    public List<Post> filter(String author, Date dateFrom, Date dateTo, List<String> hashTags) throws DAOException{
        PreparedStatement statement = null;
        PostDAO postDAO = new SQLPostDAO();
        List<Post> posts = new ArrayList<>();
        ResultSet rs, rs1;
        try {
            helper.setQuery(SELECT_USER);
            statement = helper.getPreparedStatement();
            statement.setString(1, author);
            statement.setString(2, author);
            statement.setString(3, author);
            rs = statement.executeQuery();
            while(rs.next()){
                int userId = rs.getInt(1);
                helper.setQuery(FILTER);
                statement = helper.getPreparedStatement();
                statement.setInt(1, userId);
                java.sql.Date sqlDate = new java.sql.Date(dateFrom.getTime());
                statement.setDate(2, sqlDate);
                statement.setDate(3, sqlDate);
                statement.setDate(4, sqlDate);
                sqlDate = new java.sql.Date(dateTo.getTime());
                statement.setDate(5, sqlDate);
                statement.setDate(6, sqlDate);
                statement.setDate(7, sqlDate);
                for (String tag :
                        hashTags) {
                    PreparedStatement tempStatement = statement;
                    tempStatement.setString(8, tag);
                    tempStatement.setString(9, tag);
                    tempStatement.setString(10, tag);
                    rs1 = tempStatement.executeQuery();
                    while(rs1.next()){
                        int postId = rs1.getInt(1);
                        posts.add(postDAO.get(postId));
                    }
                }
            }
            return posts;
        } catch (SQLException e) {
            throw new DAOException(e);
        } finally {
            helper.close(statement);
        }
    }
}
