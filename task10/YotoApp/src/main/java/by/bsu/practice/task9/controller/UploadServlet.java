package by.bsu.practice.task9.controller;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collection;

@MultipartConfig
public class UploadServlet extends HttpServlet {

    public static final String UPLOAD_SUCCESSFULLY = "Upload file passed successfully";
    public static final String FILE_NAME = "fileName";
    public static final String FULL_SOURCE = "/resources/pictures/";
    public static final int KB = 1024;
    public static final int START = 0;
    public static final int FINISH = 0;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        Collection<Part> parts = req.getParts();
        for (Part part :
                parts) {
            Files.copy(part.getInputStream(), Paths.get(getServletContext().getRealPath("/resources/pictures"),
                    part.getSubmittedFileName()));
        }
        resp.getOutputStream().println(UPLOAD_SUCCESSFULLY);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        String fileName = req.getParameter(FILE_NAME);
        fileName = FULL_SOURCE + fileName;
        InputStream inputStream = Files.newInputStream(Paths.get(getServletContext().getRealPath(fileName)));
        byte buffer[] = new byte[KB];
        for (; ; ) {
            int rsz = inputStream.read(buffer, START, buffer.length);
            if (rsz < FINISH)
                break;
            resp.getOutputStream().write(buffer);
        }
    }
}
