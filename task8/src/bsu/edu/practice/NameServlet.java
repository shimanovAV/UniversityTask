package bsu.edu.practice;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class NameServlet extends HttpServlet {
    private static final int MAX_LENGTH = 100;

    private static final int MIN_LENGTH = 0;

    @Override

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String name = req.getParameter("name").trim();
        if(name != null && !name.equals(""))
        {
                String answer = "Name is " + name;
                resp.getOutputStream().println(answer);
        }

    }

}
