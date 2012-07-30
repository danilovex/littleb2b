package com.example;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;
import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.modelo.MailJava;
import com.negocio.MailJavaSender;

/**
 * Servlet implementation class EnviarMail
 */

public class EnviarMail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub


		MailJava mj = new MailJava();

        //configuracoes de envio
        mj.setSmtpHostMail("smtp.gmail.com");
        mj.setSmtpPortMail("587");
        mj.setSmtpAuth("true");
        mj.setSmtpStarttls("true");
        mj.setUserMail("littleb2b@gmail.com");
        mj.setFromNameMail("Little B2B");
        mj.setPassMail("concursovpsa2012");
        mj.setCharsetMail("ISO-8859-1");
        mj.setSubjectMail("JavaMail");
        mj.setBodyMail("<html><body>EU</body></html>");
        mj.setTypeTextMail(MailJava.TYPE_TEXT_HTML);

        //sete quantos destinatarios desejar
        Map<String, String> map = new HashMap<String, String>();
        map.put("danilo.ramalho@vpsa.com.br", "email vpsa");
//        map.put("destinatario2@msn.com", "email msn");
//        map.put("destinatario3@ig.com.br", "email ig");

        mj.setToMailsUsers(map);

        //seta quatos anexos desejar

//        List<String> files = new ArrayList<String>();
//        files.add("C:\\images\\ajax_loader.gif");
//        files.add("C:\\images\\hover_next.png");
//        files.add("C:\\images\\hover_prev.png");

//        mj.setFileMails(files);

 

        try {

            new MailJavaSender().senderMail(mj);

        } catch (UnsupportedEncodingException e) {

            e.printStackTrace();

        } catch (MessagingException e) {

            e.printStackTrace(); 

        }		
		
	
	}


}
