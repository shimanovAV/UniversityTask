package by.bsu.practice.task12.dao.post;

import by.bsu.practice.task12.dao.DAOException;
import by.bsu.practice.task12.dao.connector.DataBaseHelper;
import by.bsu.practice.task12.entity.Post;
import by.bsu.practice.task12.entity.User;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SQLPostDAO implements PostDAO {

    private static final String INSERT = "INSERT INTO photo_post (DESCRIPTION, CREATION_DATE, PHOTO_LINK, USER_ID) VALUES (?, ?, ?, ?)";
    private static final String DELETE = "DELETE FROM photo_post WHERE POST_ID = ?";
    private static final String INSERT_TAG = "INSERT INTO tag (TAG) VALUES (?)";
    private static final String INSERT_TAG_POST = "INSERT INTO post_tag (POST_ID, TAG_ID) VALUES (?, ?)";
    private static final String UPDATE = "UPDATE photo_post SET DESCRIPTION = ? WHERE POST_ID = ?";
    private static final String DELETE_TAG_POST = "DELETE FROM post_tag WHERE POST_ID = ?";
    private static final String SELECT = "SELECT POST_ID, DESCRIPTION, CREATION_DATE, PHOTO_LINK, NAME  FROM photo_post join user" +
            " on user.USER_ID = photo_post.USER_ID where POST_ID = ?";
    private static final String SELECT_HASHTAGS = "SELECT TAG FROM tag join post_tag" +
            " on tag.TAG_ID = post_tag.TAG_ID where post_tag.POST_ID = ?";
    private static final String SELECT_LIKES = "SELECT NAME FROM user join likes" +
            " on user.USER_ID = likes.USER_ID where likes.POST_ID = ?";
    private static final String SELECT_LAST = "SELECT POST_ID FROM photo_post ORDER BY CREATION_DATE DESC LIMIT 1";
    private static final String SELECT_USER = "SELECT USER_ID FROM user where NAME = ? AND PASSWORD = ?";

    private DataBaseHelper helper = new DataBaseHelper();

    @Override
    public boolean add(Post post, User user) throws DAOException {
        PreparedStatement statement = null;
        ResultSet rs = null;
        int postId, userId = 0, hashTagId = 0;
        try {
            helper.setQuery(SELECT_USER);
            statement = helper.getPreparedStatement();
            helper.openManualConnection(statement);
            statement.setString(1, user.getLogin());
            statement.setString(2, user.getPassword());
            rs = statement.executeQuery();
            if(rs.next()) {
                userId = rs.getInt(1);
                helper.setQuery(INSERT);
                statement = helper.getPreparedStatement();
                helper.openManualConnection(statement);
                statement.setString(1, post.getDescription());
                java.sql.Date sqlDate = new java.sql.Date(post.getCreatedAt().getTime());
                statement.setDate(2, sqlDate);
                statement.setString(3, post.getPhotolink());
                statement.setDouble(4, userId);
                statement.executeUpdate();
                rs = statement.getGeneratedKeys();
                if(rs.next()) {
                    postId = rs.getInt(1);
                    for (String tag : post.getHashtags()) {
                        helper.setQuery(INSERT_TAG);
                        statement = helper.getPreparedStatement();
                        helper.openManualConnection(statement);
                        statement.setString(1, tag);
                        statement.executeUpdate();
                        rs = statement.getGeneratedKeys();
                        if (rs.next()) {
                            hashTagId = rs.getInt(1);
                            helper.setQuery(INSERT_TAG_POST);
                            statement = helper.getPreparedStatement();
                            helper.openManualConnection(statement);
                            statement.setInt(1, postId);
                            statement.setInt(2, hashTagId);
                             statement.executeUpdate();
                        }
                    }
                }
            }
            helper.commit(statement);
            return true;
        } catch (SQLException e) {
            helper.rollBack(statement);
            throw new DAOException(e);
        } finally {
            helper.close(statement);
        }
    }

    public boolean delete(int postId) throws DAOException {
        PreparedStatement statement = null;
        ResultSet rs;
        try {
            helper.setQuery(DELETE);
            statement = helper.getPreparedStatement();
            statement.setInt(1, postId);
            statement.executeUpdate();
            return true;
        } catch (SQLException  e) {
            throw new DAOException(e);
        } finally {
            helper.close(statement);
        }
    }

    public boolean update(int postId, Post post) throws DAOException {
        PreparedStatement statement = null;
        int hashTagId = 0;
        try {
            helper.setQuery(UPDATE);
            statement = helper.getPreparedStatement();
            helper.openManualConnection(statement);
            statement.setString(1, post.getDescription());
            statement.setInt(2, postId);
            statement.executeUpdate();
            helper.setQuery(DELETE_TAG_POST);
            statement = helper.getPreparedStatement();
            statement.setInt(1, postId);
            for (String tag : post.getHashtags()) {
                helper.setQuery(INSERT_TAG);
                statement = helper.getPreparedStatement();
                statement.setString(1, tag);
                statement.executeUpdate();
                hashTagId = statement.getGeneratedKeys().getInt(1);
                helper.setQuery(INSERT_TAG_POST);
                statement = helper.getPreparedStatement();
                statement.setInt(1, postId);
                statement.setInt(1, hashTagId);
            }
            helper.commit(statement);
            return true;
        } catch (SQLException e) {
            helper.rollBack(statement);
            throw new DAOException(e);
        } finally {
            helper.close(statement);
            helper.closeManualConnection(statement);
        }
    }

    public Post get(int postId) throws DAOException {
        PreparedStatement statement = null;
        ResultSet rs = null;
        String id = null, description = null, photoLink = null, author = null;
        Date createdAt = new Date();
        List<String> hashTags = new ArrayList<>();
        List<String> likes = new ArrayList<>();
        try {
            helper.setQuery(SELECT);
            statement = helper.getPreparedStatement();
            statement.setInt(1, postId);
            rs = statement.executeQuery();
            if (rs.next()) {
                id = String.valueOf(rs.getInt(1));
                description = rs.getString(2);
                createdAt = rs.getDate(3);
                photoLink = rs.getString(4);
                author = rs.getString(5);
                helper.setQuery(SELECT_HASHTAGS);
                statement = helper.getPreparedStatement();
                statement.setInt(1, postId);
                rs = statement.executeQuery();
                while(rs.next()){
                    hashTags.add(rs.getString(1));
                }
                helper.setQuery(SELECT_LIKES);
                statement = helper.getPreparedStatement();
                statement.setInt(1, postId);
                rs = statement.executeQuery();
                while(rs.next()){
                    likes.add(rs.getString(1));
                }
            }
            return new Post(id, description, createdAt, author, photoLink, likes, hashTags);
        } catch (SQLException  e) {
            throw new DAOException(e);
        } finally {
            helper.close(statement);
        }
    }

    public int getLastId() throws DAOException{
        PreparedStatement statement = null;
        ResultSet rs = null;
        int id = 0;
        try {
            helper.setQuery(SELECT_LAST);
            statement = helper.getPreparedStatement();
            rs = statement.executeQuery();
            if(rs.next()){
                id = rs.getInt(1);
            }
            return id;
        } catch (SQLException  e) {
            throw new DAOException(e);
        } finally {
            helper.close(statement);
        }

    }
}
