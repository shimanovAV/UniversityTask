package by.bsu.practice.task8;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class MethodFilter implements Filter {

    public void init(FilterConfig filterConfig)
    {}

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        long start = System.currentTimeMillis();
        filterChain.doFilter(servletRequest,servletResponse);
        long end =System.currentTimeMillis();
        long time = end - start;
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        String methodName = req.getMethod();
        String url = req.getRequestURL().toString();
        String info = methodName + " " + url + " " + time;
        System.out.println(info);
    }

    @Override
    public void destroy() {}
}