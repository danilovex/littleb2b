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

/**
 * Servlet implementation class ImagemGoogle
 */
public class ImagemGoogle extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	@Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

		String busca = req.getParameter("busca");
		busca  = busca.replaceAll("[_]", "%20");
		
		String tamanho = req.getParameter("tam");
URL url = new URL("https://ajax.googleapis.com/ajax/services/search/images?" +
                "v=1.0&userip=INSERT-USER-IP&imgsz="+tamanho+"&rsz=1&safe=active&q="+busca);

URLConnection connection = url.openConnection();
connection.addRequestProperty("Referer", "http://localhost:8080/littleb2b");

String line;
StringBuilder builder = new StringBuilder();

BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
	while((line = reader.readLine()) != null) {
		builder.append(line);
	}

//JSONObject json = new JSONObject();		
		
		
		String aux = builder.toString();  
		int i = aux.indexOf("url");  
		int j = aux.indexOf("visibleUrl");  
		  
		String novaString = aux.substring(i,j);
		
		novaString = novaString.replaceAll("[\"\']","");				  
		
		novaString  = novaString.replaceAll("[,]", "");
				
        ServletOutputStream out = resp.getOutputStream();

        out.write(novaString.getBytes());
        out.flush();
        out.close();
    }

}
