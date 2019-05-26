package by.bsu.practice.task12.dao.connector;
import org.apache.commons.dbcp2.BasicDataSource;

import java.sql.Connection;
import java.sql.SQLException;

public enum ConnectionPool {

    POOL;

    private static final String URL = "jdbc:mysql://localhost:3306/yoto";
    private static final String PATH_TO_DRIVER = "com.mysql.jdbc.Driver";
    private static final String USER = "root";
    private static final String PASSWORD = "iratar07";
    private static final int CONN_POOL_SIZE = 10;
    private static final int MAX_STATEMENTS = 100;

    private BasicDataSource dataSource;

     ConnectionPool(){
        dataSource = new BasicDataSource();
        dataSource.setDriverClassName(PATH_TO_DRIVER);
        dataSource.setUrl(URL);
        dataSource.setUsername(USER);
        dataSource.setPassword(PASSWORD);
        dataSource.setInitialSize(CONN_POOL_SIZE);
        dataSource.setMaxOpenPreparedStatements(MAX_STATEMENTS);
    }

    public Connection getConnection() throws ConnectionException{
         Connection connection;
        try {
            connection = dataSource.getConnection();

        } catch (SQLException e) {
            throw new ConnectionException(e);
        }
        return connection;
    }

}
