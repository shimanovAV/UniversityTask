package by.bsu.practice.task12.dao.connector;
import by.bsu.practice.task12.dao.DAOException;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;


public class DataBaseHelper {
    private Connection connect;
    private String query;

    public DataBaseHelper() {
        try {
            connect = ConnectionPool.POOL.getConnection();
        }catch(ConnectionException e){
           e.printStackTrace();
        }
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public PreparedStatement getPreparedStatement() throws DAOException {
        PreparedStatement ps;
        try {
            connect = ConnectionPool.POOL.getConnection();
            ps = connect.prepareStatement(this.query, Statement.RETURN_GENERATED_KEYS);
            return ps;
        } catch (ConnectionException | SQLException var3) {
            throw new DAOException(var3);
        }
    }
    public void commit(PreparedStatement ps) throws DAOException{
        try {
            Connection connection = ps.getConnection();
            connection.commit();
        }catch (SQLException e){
            throw new DAOException(e);
        }
    }

    public void rollBack(PreparedStatement ps) throws DAOException{
        try {
            Connection connection = ps.getConnection();
            connection.rollback();
        }catch (SQLException e){
            throw new DAOException(e);
        }
    }

    public void close(PreparedStatement ps) throws DAOException {
        if (ps != null) {
            try {
                ps.close();
            } catch (SQLException e) {
                throw new DAOException(e);
            }
        }
    }
    public void openManualConnection(PreparedStatement ps) throws DAOException {
        try {
            Connection connection = ps.getConnection();
            connection.setAutoCommit(false);
        }catch (SQLException e){
            throw new DAOException(e);
        }
    }
    public void closeManualConnection(PreparedStatement ps) throws DAOException {
        try {
            Connection connection = ps.getConnection();
            connection.setAutoCommit(true);
        }catch (SQLException e){
            throw new DAOException(e);
        }
    }

}
