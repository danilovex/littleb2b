package com.example;

import java.io.IOException;
import java.io.PrintWriter;
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
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
        mj.setSubjectMail("Nro. Pedido de Compra: "+request.getParameter("NumPedido"));
        
        String CorpoMail = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>";
        CorpoMail = CorpoMail + "<body style='font-family:arial, helvetica, serif;font-size:12px;'>";
        CorpoMail = CorpoMail + "<p style='line-height:300%;'>A empresa "+request.getParameter("empresa")+" acessou o Little B2B e lhe enviou o Pedido de Compra abaixo:<br /></p>";
        CorpoMail = CorpoMail + "<h3>Dados da Empresa</h3>";
        CorpoMail = CorpoMail + "<p>Nro. Pedido: "+request.getParameter("NumPedido")+"</p>";
        CorpoMail = CorpoMail + "<p>Empresa: "+request.getParameter("empresa")+"</p>";
        CorpoMail = CorpoMail + "<p>CNPJ: "+request.getParameter("cnpj")+"</p>";
        CorpoMail = CorpoMail + "<p>Responsável: "+request.getParameter("responsavel")+"</p>";
        CorpoMail = CorpoMail + "<p>Telefone: "+request.getParameter("telefone")+"</p>";
        CorpoMail = CorpoMail + "<p>Email: "+request.getParameter("email")+"</p>";
        CorpoMail = CorpoMail + "<p>Forma de Pagamento: "+request.getParameter("formapagamento")+"</p>";
        CorpoMail = CorpoMail + "<p>Endereço: "+request.getParameter("endereco")+"</p>";
        CorpoMail = CorpoMail + "<p>Cidade/UF: "+request.getParameter("cidadeuf")+"</p>";
        CorpoMail = CorpoMail + "<p>Observação: "+request.getParameter("observacao")+"</p>";
        CorpoMail = CorpoMail + "<hr style='margin:20px 0 20px 0;'>";
        
        CorpoMail = CorpoMail + "<h3>Itens do Pedido</h3>";

        CorpoMail = CorpoMail + "<p style='line-height:300%;'>Segue abaixo lista dos itens do pedido de compra:</p>";

        CorpoMail = CorpoMail + "<table width='700px' style='border:1px solid #000;font-family:arial, helvetica, serif;font-size:12px;' cellpadding='5' cellspacing='0'><tr>";

        CorpoMail = CorpoMail + "<td style='border-bottom:1px solid #000;'><b>Id</b></td>";
        CorpoMail = CorpoMail + "<td style='border-bottom:1px solid #000;'><b>Descrição</b></td>";
        CorpoMail = CorpoMail + "<td style='border-bottom:1px solid #000;' align='center'><b>Quantidade</b></td>";
        CorpoMail = CorpoMail + "<td style='border-bottom:1px solid #000;' align='center'><b>Preço Unitário</b></td>";           
        CorpoMail = CorpoMail + "<td style='border-bottom:1px solid #000;' align='center'><b>Sub-Total</b></td>";           
        CorpoMail = CorpoMail + "</tr>";
        
        //itens
        CorpoMail = CorpoMail + request.getParameter("TodosItems");
        CorpoMail = CorpoMail + "<tr><td style='border-top:1px solid #000;' align='right' colspan='4'><b>Valor Total</b></td>";
        CorpoMail = CorpoMail + "<td style='border-top:1px solid #000;' align='right'><b>"+request.getParameter("VrTotal")+"</b></td></tr>";
        CorpoMail = CorpoMail + "</table>";

        CorpoMail = CorpoMail + "</body> </html>";
        
        
        mj.setBodyMail(CorpoMail);
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
            
            PrintWriter pw = response.getWriter(); // pega o 'escritor' da resposta  
            pw.println("OK"); 
            pw.flush();            

        } catch (UnsupportedEncodingException e) {

            e.printStackTrace();

        } catch (MessagingException e) {

            e.printStackTrace(); 

        }		
		
	
	}


}
