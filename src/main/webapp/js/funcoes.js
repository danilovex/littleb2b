// JavaScript Document
function replaceAll(str, de, para){
    var pos = str.indexOf(de);
    while (pos > -1){
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
    return (str);
}
function getNumPedido(){ 
   	momentoAtual = new Date(); 
   	hora = momentoAtual.getHours(); 
   	minuto = momentoAtual.getMinutes(); 
   	segundo = momentoAtual.getSeconds(); 

   	empresa = getCookie('B2b');
   	empresa = empresa.split("|");
   	
   	NumPedido = empresa + '-' + hora + '' + minuto + '' + segundo; 
   	
   	NumPedido = replaceAll(NumPedido,",","");
   	NumPedido = replaceAll(NumPedido,".","");
   	NumPedido = replaceAll(NumPedido,"/","");
   	NumPedido = NumPedido.replace("-","");
   	
   	return NumPedido;
   	
}
function ListarProdutos(){
$.getJSON('../validacao/produtos.json', function(result) {
		cont = 8;
		$(".Item").remove();
		 $.each(result, function(i, field){						 
			$("#listaProdutos tbody").append(AddProdutoTable(field.id, field.descricao, field.preco));				
		 if (i == cont){
			gravaCookie('PaginacaoProdutos', i, 8);
			 return false;
		 }			
		});
		 $("#maisProdutos").show();
	  }); 
}
function BuscaProdutosFiltro(filtro){
	$(".Item").remove();
	$.getJSON('../validacao/produtos.json', function(result) {
		cont= 0;
			 $.each(result, function(i, field){				 
				 descr = (field.descricao).toUpperCase();
				 filtro = filtro.toUpperCase();
				 if(descr.search(filtro) != "-1"){
				 	$("#listaProdutos tbody").append(AddProdutoTable(field.id, field.descricao, field.preco));
				 	cont++;
				 }				 
			});
			 if (cont == 0)
				 $("#listaProdutos tbody").append("<tr class='Item'><td colspan='5'><center>Nenhum item encontrado!</center></td></tr>");
				 
			 $("#maisProdutos").hide();
		  }); 
}
function AddItemPedido(id,qtd){
	$.getJSON('../validacao/produtos.json', function(result) {
		 $.each(result, function(i, field){						 							
		 if (field.id == id){
			 $("#listaProdutos tbody").append(AddProdutoTablePedido(field.id, field.descricao, field.preco,qtd));

			 //adiciona itens para fechar pediddo
			 Items = $("#TodosItems").attr("value");			 
			 
			 if (backgroundItem = "")
				 backgroundItem = "style='background-color:#E2E2E2;'";
			 else
				 backgroundItem = "";
			 
			 Items = Items + "<tr "+backgroundItem+">";
			 Items = Items + "<td align='center'>"+field.id+"</td>";
			 Items = Items + "<td>"+field.descricao+"</td>";			 
			 Items = Items + "<td align='right'>"+qtd+"</td>";
			 Items = Items + "<td align='right'>"+field.preco+"</td>";
			 Items = Items + "<td align='right'>"+float2moeda(field.preco*qtd)+"</td>";			 
			 Items = Items + "</tr>";
			 $("#TodosItems").attr("value",Items);
			 
			 return false;
		 }			
		});
	  }); 	
}
function ExibirImgItem(id){

	pesquisar = $("#"+id).html();
	
	fim_p = pesquisar.indexOf(" -");
	pesquisar = pesquisar.substring(0, fim_p);
	pesquisar = pesquisar.replace(/ /g,"_");
	
	$.ajax({
		  url: '../ImagemGoogle',
		  data:'busca='+pesquisar+'&tam=medium',
		  async:false,
		  success: function(data) {
			  data = data.replace("url:","");
			  $("#imgItem").removeAttr("src");
			  $("#imgItem").attr("src",data);
		  },
		  error: function(){
			  $("#imgItem").removeAttr("src");
			  $("#imgItem").attr("src","http://www.guanaplast.com.br/imagens/produtos/459/ImagemNaoDisponivel.jpg");			  
		  }
		});		
	
	document.getElementById('underlay').style.display='block'; 
	document.getElementById('lightbox').style.display='block';
	
}
function setItemCarrinho(carrinho, idnew){
	gravaCookie('Carrinho', carrinho+'|'+idnew+'#'+$('#qtd'+idnew).attr('value'), 1);
	$('#qtd'+idnew).attr('disabled',true);	
}
function Comprar(obj){
	
	var btnstatus = $('#'+obj.id).attr('class');
	
	if (btnstatus.search("btn-success") != -1){		
		$('#'+obj.id).removeClass("btn-success").addClass("btn-danger");	
		$('#'+obj.id).html("<i class='icon-trash icon-white'/>");
		if(getCookie('Carrinho')){
				carrinho_compor = getCookie('Carrinho');
				setItemCarrinho(carrinho_compor, obj.id);
			}else{
				//carrinho vazio
				setItemCarrinho('0', obj.id);
		}
	}else{		
		$('#'+obj.id).html("<i class='icon-shopping-cart icon-white'/> Comprar");
		$('#'+obj.id).removeClass("btn-danger").addClass("btn-success");
		RemoveItemCarrinho(obj);
		//carrinho_compor = getCookie('Carrinho');
		//carrinho_compor = carrinho_compor.replace("|"+obj.id+"#"+$('#qtd'+obj.id).attr('value'),"");
		$('#qtd'+obj.id).attr('disabled',false);
		//gravaCookie('Carrinho', carrinho_compor, 1);		
	}
}
function ListarPedidoItem(){
	if (getCookie('Carrinho') != "" && getCookie('Carrinho') != 0 && getCookie('Carrinho') != null){
		var result = getCookie('Carrinho');
		dadosped = result.split("|");		
		$("#TodosItems").attr("value","");
		for(var i=0;i<dadosped.length;i++){
			pedItem = dadosped[i].split("#");
			AddItemPedido(pedItem[0],pedItem[1]);		
		}	
		
	}else{
		//carrinho vazio
				 $("#listaProdutos tbody").append("<tr class='Item'><td colspan='6'><center>Seu carrinho está vazio, volte para lista de produtos. <a href='../produtos/'>Clique aqui.</a></center></td></tr>");
	}
}
function RemoveItemCarrinho(obj){
	carrinho_compor = getCookie('Carrinho');
	carrinho_compor = carrinho_compor.replace("|"+obj.id+"#"+$('#qtd'+obj.id).attr('value'),"");
	alert(carrinho_compor);
	gravaCookie('Carrinho', carrinho_compor, 1);	
}
function RemovePedido(obj){
	RemoveItemCarrinho(obj);
	$(".Item").remove();
	ListarPedidoItem();
}
function AddProdutoTable(id, descricao, preco){	
	var produtoTable = "<tr class='Item'><td>"+id+"</td><td><a href='javascript:void(0);' id='Img"+id+"' onclick=ExibirImgItem(this.id);>"+descricao+" <i class='icon-camera'></i></a></td><td><input type='text' class='qtd' id='qtd"+id+"' value='1' /></td><td ><div class='precotd'>"+float2moeda(preco)+"</div></td><td><div class='btncomprartd'><button onclick='Comprar(this);' id="+id+" class='btn btn-success'><i class='icon-shopping-cart icon-white'/> Comprar</button></div></td></tr>";	
	return produtoTable;	
}
function AddProdutoTablePedido(id, descricao, preco, qtd){	
	var produtoTable = "<tr class='Item'><td>"+id+"</td><td><a href='javascript:void(0);' id='Img"+id+"' onclick=ExibirImgItem(this.id);>"+descricao+" <i class='icon-camera'></i></a></td><td><div class='precotd'><input type='hidden' id='qtd"+id+"' value='"+qtd+"' />"+qtd+"</div></td><td ><div class='precotd'>"+float2moeda(preco)+"</div></td><td ><div class='precotd' id='VrItem"+id+"'>"+float2moeda(preco*qtd)+"</div></td><td><div class='btncomprartd'><button onclick='RemovePedido(this);' id="+id+" class='btn btn-danger'><i class='icon-trash icon-white'/></button></div></td></tr>";
	valorPedido = $("#VrTotalPedido").html();		
	$("#VrTotalPedido").html(float2moeda((parseFloat(preco*qtd))+parseFloat(valorPedido)));
	
	return produtoTable;	
}
function MaisProdutos(){
$.getJSON('../validacao/produtos.json', function(result) {
		cont = parseInt(getCookie('PaginacaoProdutos'));
		cont_fim = parseInt(cont) + 5;
		 $.each(result, function(i, field){
			 valormax = i;
		 });
		 if (cont < valormax){
			 $.each(result, function(i, field){
			 if (i == cont_fim){				
				 return false;
			 }
			 if (i > cont)
				$("#listaProdutos tbody").append(AddProdutoTable(field.id, field.descricao, field.preco));				
							
			ultimoPag = i;
			});
			gravaCookie('PaginacaoProdutos', ultimoPag, 8);			
		 }else
		 	$('#maisProdutos').hide();
		 
		 window.scrollTo(0, document.body.scrollHeight);	  
}); 


}
function validaPagina(){
	if(getCookie('B2b') == null || getCookie('B2b') == 0)
			window.location = '../';
			
}
function logarEmpresa(cnpj){
	  $.getJSON('validacao/test.json', function(result) {
				 $.each(result, function(i, field){
					if (field.identificacao == cnpj && field.identificacao != '' && field.identificacao != null){
						gravaCookie('B2b', field.id+'|'+cnpj, 8);
					}
				});
			  }); 			  
	}
function validLogin(cnpj){
	var	valid = false;
	var result = getCookie('B2b');
	if (result != null){
		result = result.split("|");
			if (result[1] == cnpj)
				valid = true;
	}
		
	return valid;
	}

function gravaCookie(name, value, expires)
{
	var path = "/";
	var domain = "";
	var secure = "";
// set time, it's in milliseconds
var today = new Date();
today.setTime( today.getTime() );

/*
if the expires variable is set, make the correct
expires time, the current script below will set
it for x number of days, to make it for hours,
delete * 24, for minutes, delete * 60 * 24
*/
if ( expires )
{
expires = expires * 1000 * 60 * 60 * 24;
}
var expires_date = new Date( today.getTime() + (expires) );

document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
( ( path ) ? ";path=" + path : "" ) +
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );
}
function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}
function FormataCnpj(campo, teclapres)
			{
				var tecla = teclapres.keyCode;
				var vr = new String(campo.value);
				vr = vr.replace(".", "");
				vr = vr.replace("/", "");
				vr = vr.replace("-", "");
				tam = vr.length + 1;
				if (tecla != 14)
				{
					if (tam == 3)
						campo.value = vr.substr(0, 2) + '.';
					if (tam == 6)
						campo.value = vr.substr(0, 2) + '.' + vr.substr(2, 5) + '.';
					if (tam == 10)
						campo.value = vr.substr(0, 2) + '.' + vr.substr(2, 3) + '.' + vr.substr(6, 3) + '/';
					if (tam == 15)
						campo.value = vr.substr(0, 2) + '.' + vr.substr(2, 3) + '.' + vr.substr(6, 3) + '/' + vr.substr(9, 4) + '-' + vr.substr(13, 2);
				}
			}
function float2moeda(num) {

   x = 0;

   if(num<0) {
      num = Math.abs(num);
      x = 1;
   }
   if(isNaN(num)) num = "0";
      cents = Math.floor((num*100+0.5)%100);

   num = Math.floor((num*100+0.5)/100).toString();

   if(cents < 10) cents = "0" + cents;
      for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
         num = num.substring(0,num.length-(4*i+3))+'.'
               +num.substring(num.length-(4*i+3));
   ret = num + ',' + cents;
   if (x == 1) ret = ' - ' + ret;return ret;

}			