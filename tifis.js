var tablero, direccion;
var k = 0;
var angulos = {
	supIzq:0,
	supDer:0,
	infIzq:0,
	infDer:0
};
var teclas = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};
var fondo = {	//JSON
	imagenURL: "fondo.png",
	imagenOK: false
};
var tifis = {
	frenteURL: "diana-frente.png",
	frenteOK: false,
	atrasURL: "diana-atras.png",
	atrasOK: false,
	derURL: "diana-der.png",
	derOK: false,
	izqURL: "diana-izq.png",
	izqOK: false,
	x: 100,
	y: 100,
	velocidad: 50
};
var liz = {
	lizURL: "liz.png",
	lizOK: false,
	x:400,
	y:200
};
var fresa = {
	fresaURL: "fresa.png",
	fresaOK: false,
	x:50,
	y:150
};
var campo = {
	frutas: [ //#,x,y,t-f; t=no usada,f usada
		[0,0,0,true],
		[1,0,0,true],
		[2,0,0,true],
		[3,0,0,true],
		[4,0,0,true],
		[5,0,0,true],
		[6,0,0,true],
		[7,0,0,true],
		[8,0,0,true],
		[9,0,0,true],
		[10,0,0,true],
		[11,0,0,true],
		[12,0,0,true],
		[13,0,0,true],
		[14,0,0,true],
		[15,0,0,true],
		[16,0,0,true],
		[17,0,0,true],
		[18,0,0,true],
		[19,0,0,true],
		[20,0,0,true],
		[21,0,0,true],
		[22,0,0,true],
		[23,0,0,true],
		[24,0,0,true],
		[25,0,0,true],
		[26,0,0,true],
		[27,0,0,true],
		[28,0,0,true],
		[29,0,0,true]
	]
};
var vecino = {
	rangos: [[0],[50],[100],[150],[200],[250],[300],[350],[400],[450],[500]]
};
//pseudo-valida valores vecinos (limites)
function vecinos(x){
	o1 = vecino.rangos;
	//document.writeln(o.length+"<br />"+o+"<br />");
	for(var i=0; i<o1.length;i++){
		var obj1 = o1[i];
		//document.writeln(">"+obj+"><br />");
		for(var key1 in obj1){
			var attrValue1 = obj1[key1];
			//document.writeln("attrValue:"+attrValue+"<br >");
			if(x < attrValue1){
				return attrValue1;
			}
		}
	}
}
//pseudo-valida frutas obtenidas
function extraer(){
	o = campo.frutas;
	//document.writeln("o:"+o+"<br />");
	for(var i=0; i<o.length;i++){
		var obj = o[i];
		//document.writeln("obj:"+obj+"<br />");
		for (var key in obj){
			var attrName = key;
			var attrValue = obj[key];
			//document.writeln("obj:"+obj+"<br />"+"key:"+key+" Name:"+attrName+" Value:"+attrValue+"<br />"+"tifis.x:"+tifis.x+"<br />"+"vecinosSupx(obj[1]):"+vecinos(obj[1])+" vecinosInfX(obj[1]-50):"+vecinos(obj[1]-50)+"<br />"+"vecinosSupy(obj[2]):"+vecinos(obj[2])+" vecinosInfy(obj[2]-50):"+vecinos(obj[2]-50)+"<br />"+obj[3]+"<br /><br />");
			if(attrName==0 && 
				(
					(
					(tifis.x >= vecinos(obj[1]-50) && 
					tifis.x <= vecinos(obj[1])) || 
					(tifis.x == obj[1])
					)
					&&
					(
					(tifis.y >= vecinos(obj[2]-50) && 
					tifis.y <= vecinos(obj[2])) || 
					(tifis.y == obj[2])
					)
				)
				){
				//tocar la fresa es punto
				obj[3]=false;
				//document.writeln("obj:"+obj+"<br />"+"key:"+key+" Name:"+attrName+" Value:"+attrValue+"<br />"+"tifis.x:"+tifis.x+"<br />"+"vecinosSupx(obj[1]):"+vecinos(obj[1])+" vecinosInfX(obj[1]-50):"+vecinos(obj[1]-50)+"<br />"+"vecinosSupy(obj[2]):"+vecinos(obj[2])+" vecinosInfy(obj[2]-50):"+vecinos(obj[2]-50)+"<br />"+obj[3]+"<br /><br />");
			}
		}
	}
	//document.writeln("hol2:"+campo.frutas[0][1]+","+campo.frutas[0][2]);
}
//pseudo-preCarga imagenes frutas
function generar(){
	o2 = campo.frutas;
	for(var i=0; i<o2.length;i++){
		var obj2 = o2[i];
		//document.writeln(obj.value+"AAA<br />"+obj.length+"BBB<br />"+obj.string+"CCC<br />");
		for(var key in obj2){
			obj2[1]=Math.ceil(patito(0,40))*10;
			obj2[2]=Math.ceil(patito(0,40))*10;
		}
	}	
}
//crea fondo laberinto con obstaculos
function inicio(){
	var canvas = document.getElementById("campo");
	tablero = canvas.getContext("2d"); //contexto
	generar();
	/*
	//prueba limites de la fruta
	angulos.supDer = vecinos(183);
	angulos.supIzq = angulos.supDer - 50;
	angulos.infDer = vecinos(215);
	angulos.infIzq = angulos.infDer - 50;
	document.writeln(
		"x:183 y:215 <br >"+
		"limite superior I:"+angulos.supIzq+" , "+
		"limite inferior I:"+angulos.infIzq+" , "+"<br />"+
		"limite superior D:"+angulos.supDer+" , "+		
		"limite inferior D:"+angulos.infDer
		);
	*/
	//cargar toda imagenes de fondo
	fondo.imagen = new Image(); 				//<img> en html
	//valida la creacion debajo
	//console.log(fondo);
	fondo.imagen.src = fondo.imagenURL; 		//equivale a fondo.jpg
	fondo.imagen.onload = confirmarFondo;		//carga imagen en html

	tifis.frente = new Image(); 				//<img> en html
	tifis.frente.src = tifis.frenteURL; 		//equivale a fondo.jpg
	tifis.frente.onload = confirmarFrente;		//carga imagen en html
	
	tifis.atras = new Image(); 					//<img> en html
	tifis.atras.src = tifis.atrasURL; 			//equivale a fondo.jpg
	tifis.atras.onload = confirmarAtras;		//carga imagen en html
	
	tifis.der = new Image(); 					//<img> en html
	tifis.der.src = tifis.derURL; 				//equivale a fondo.jpg
	tifis.der.onload = confirmarDer;			//carga imagen en html
	
	tifis.izq = new Image(); 					//<img> en html
	tifis.izq.src = tifis.izqURL; 				//equivale a fondo.jpg
	tifis.izq.onload = confirmarIzq;			//carga imagen en html

	liz.lizy = new Image(); 					//<img> en html
	liz.lizy.src = liz.lizURL; 					//equivale a fondo.jpg
	liz.lizy.onload = confirmarLiz;				//carga imagen en html

	fresa.ouch = new Image(); 					//<img> en html
	fresa.ouch.src = fresa.fresaURL; 					//equivale a fondo.jpg
	fresa.ouch.onload = confirmarFresa;				//carga imagen en html

	document.addEventListener("keydown", teclado);
	//var m = document.getElementById("mover");
	//m.addEventListener("click", movimiento);
}
//confirma imagenes para precarga
function confirmarLiz(){
	liz.lizOK = true;
	dibujar();
}
function confirmarFondo(){
	fondo.imagenOK = true;
	dibujar();
}
function confirmarFrente(){
	tifis.frenteOK = true;
	dibujar();
}
function confirmarAtras(){
	tifis.atrasOK = true;
	dibujar();
}
function confirmarDer(){
	tifis.derOK = true;
	dibujar();
}
function confirmarIzq(){
	tifis.izqOK = true;
	dibujar();
}
function confirmarFresa(){
	fresa.fresaOK = true;
	dibujar();
}
//crea aleatorios
function patito(minimo, maximo)
{
    var numero = Math.floor( Math.random() * (maximo - minimo + 1) + minimo );
    return numero;
}
//confirma obstaculos y limite de canvas
function teclado(datos){
	//console.log(datos);
	var codigo = datos.keyCode;
	if(codigo == teclas.UP && (tifis.y > 0)){
		if((tifis.y == 250 && tifis.x < 150) || (tifis.y == 250 && tifis.x == 200) || (tifis.y == 400 && tifis.x > 100)){
			pared = true;
		}else{
			tifis.y -= tifis.velocidad;
		}
	}
	if(codigo == teclas.DOWN && (tifis.y < 450)){
		if((tifis.y == 150 && tifis.x < 150) || (tifis.y == 300 && tifis.x > 100)){
			pared = true;
		}else{
			tifis.y += tifis.velocidad;
		}
	}
	if(codigo == teclas.LEFT && (tifis.x > 0)){
		if((tifis.y == 200 && tifis.x < 200) || (tifis.y <250 && tifis.x == 250)){
			pared = true;
		}else{
			tifis.x -= tifis.velocidad;
		}
	}
	if(codigo == teclas.RIGHT && (tifis.x < 450)){
		if((tifis.y < 250 && tifis.x == 150) || (tifis.y == 350 && tifis.x == 100)){
			pared = true;
		}else{
			tifis.x += tifis.velocidad;
		}
	}
	direccion = codigo;
	extraer();
	dibujar();
}
//refresh deimagenes con base en movimientos
function dibujar(){	//herramientas de dibujo
	if(fondo.imagenOK == true){
		tablero.drawImage(fondo.imagen, 0,0);
	}
	if(liz.lizOK){
		tablero.drawImage(liz.lizy, liz.x, liz.y);
	}
	if(fresa.fresaOK){
		for(var i=0;i<30;i++){
			if(campo.frutas[i][3]){
				fresa.x = campo.frutas[i][1];
				fresa.y = campo.frutas[i][2];
				tablero.drawImage(fresa.ouch, fresa.x, fresa.y);			
			}
		}
	}
	var tifiDibujo = tifis.frente;
	if(tifis.frenteOK && tifis.atrasOK && tifis.derOK && tifis.izqOK){
		if(direccion == teclas.UP ){
			tifiDibujo = tifis.atras;
		}
		if(direccion == teclas.DOWN){
			tifiDibujo = tifis.frente;
		}
		if(direccion == teclas.LEFT){
			tifiDibujo = tifis.izq;
		}
		if(direccion == teclas.RIGHT){
			tifiDibujo = tifis.der;
		}						
		//tablero.drawImage(tifis.frente, tifis.x, tifis.y);
		tablero.drawImage(tifiDibujo, tifis.x, tifis.y);
		tablero.font = "30px Verdana strong";
		tablero.textAlign = "rigth";
		tablero.strokeStyle = "cyan";
		tablero.fillStyle = "blue";
		tablero.textBaseline = "bottom";
		tablero.fillText(tifis.x +","+ tifis.y, 380, 400, 100);
		tablero.strokeText(tifis.x +","+ tifis.y, 380, 400, 100);		
	}
}