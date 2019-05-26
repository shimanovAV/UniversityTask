package by.bsu.practice.task12.dao.connector;

public class ConnectionException extends Exception{
    private static final long serialVersionUID = 1L;
    public ConnectionException(){super();
    }
    public ConnectionException(String message){
        super(message);
    }
    public ConnectionException(Exception e){
        super(e);
    }
    public ConnectionException(String message, Exception e){
        super(message, e);
    }
}
