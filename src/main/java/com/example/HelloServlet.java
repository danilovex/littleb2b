package com.example;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class HelloServlet extends HttpServlet {

	@Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

		String busca = req.getParameter("busca");
URL url = new URL("https://ajax.googleapis.com/ajax/services/search/images?" +
                "v=1.0&q="+busca+"&userip=INSERT-USER-IP&imgsz=icon&rsz=1&safe=active");

URLConnection connection = url.openConnection();
connection.addRequestProperty("Referer", "http://localhost:8080/littleb2b");

String line;
StringBuilder builder = new StringBuilder();
BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
while((line = reader.readLine()) != null) {
builder.append(line);
}

//JSONObject json = new JSONObject();		
		
		
        ServletOutputStream out = resp.getOutputStream();
        
        out.write(builder.toString().getBytes());
        out.flush();
        out.close();
    }
    
}
