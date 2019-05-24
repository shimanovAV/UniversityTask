package by.bsu.practice.task8;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class NameServlet extends HttpServlet {

    @Override

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String name = req.getParameter("name");
        if(name != null && !name.equals(""))
        {
            name.trim();
            String answer = "Name is " + name;
            resp.getOutputStream().println(answer);
        }

    }

}
