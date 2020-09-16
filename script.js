document.addEventListener("keydown",saltar)

var lienzo = document.getElementById("canvas")
var ctx = lienzo.getContext("2d")
var fps,t,a,y,escalado,ranx,rany,ranz;

// Si FPS es 30, entonces el tiempo de muestreo es de 0.0333s
fps = 60;
t=1/fps;
a=400;
escalado=10;
// bucle principal del juego---------------------------------------
setInterval(function() {principal();},1000/fps)
// bucle principal del juego--------------------------------------

// FUNCION PRINCIPAL**********************************************
function principal () {
  borrarCanvas();
  logicaSuelo();
  logicaNube();
  dibujarSuelo();
  logicaEnemigo();
  logicaSalto();
  dibujarPlayer();
  puntuacion();
  colision ();
}
// Variables e igualdades------------------------------------------
var ancho = 700;
var alto = 300;
var suelo = 200;
var player = {x:50,y:suelo, saltando:false, v:0, vo:110, agachado:false};
player.v = player.vo;
var nivel = {velocidad:8,puntuacion:0, muerto:false};
var enemigo = {x:ancho+100, y:suelo-25};
var nube1 = {x:-200, y:100, ann:81,aln:32};
var nube2 = {x:-200, y:100, ann:81,aln:32};
var nube3 = {x:-200, y:100, ann:81,aln:32};
var suelograf = {x:0, y:250};
//Dibujando al jugador--------------------------------------------
function dibujarPlayer () {
  if (player.agachado == false) {
  ctx.fillStyle = "#009dd6";
  ctx.fillRect(player.x,player.y,50,50);
} else {
  ctx.fillStyle = "#009dd6";
  ctx.fillRect(player.x-10,player.y+15,75,35);
}
}
//Dibujando al enemigos--------------------------------------------
function dibujarEnemigo () {
  if (ranz == 1) {
    enemigo.y = suelo-25;
    ctx.fillStyle = "#1cac0f";
    ctx.fillRect(enemigo.x,enemigo.y,38,75)
  } else {
    enemigo.y = suelo-110;
    ctx.fillStyle = "#c15beb";
    ctx.fillRect(enemigo.x,enemigo.y,42,120)
    }
}
//Dibujando nube--------------------------------------------
function dibujarNube () {
  ctx.fillStyle = "rgba(209, 240, 255, 0.4)";
  ctx.fillRect(nube1.x,nube1.y,nube1.ann,nube1.aln);
  ctx.fillStyle = "rgba(209, 240, 255, 0.4)";
  ctx.fillRect(nube2.x,nube2.y,nube2.ann,nube2.aln)
  ctx.fillStyle = "rgba(209, 240, 255, 0.4)";
  ctx.fillRect(nube3.x,nube3.y,nube3.ann,nube3.aln)
}
//Dibujando suelo--------------------------------------------
function dibujarSuelo() {
  ctx.fillStyle = "#deb53c";
  ctx.setLineDash([5, 15]);
  ctx.fillRect(suelograf.x,suelograf.y,1400,50)
}
//Funcion graedad-------------------------------------------------
function logicaSalto () {
   if(player.saltando==true) {
     if (player.v < 0 && player.y > suelo-2) {
       player.y = suelo;
       player.v = player.vo;
       player.saltando = false;
     } else {
        var mod = (player.v * t) - ((a*t*t)/2);
        var mod2 = mod*escalado;
        player.y = player.y - mod2;
        player.v = player.v - (a*t);
      }
    }
}
// función de saltar-------------------------------------------------
function saltar (evento) {
    if (evento.keyCode == 38){
      if (nivel.muerto == false) {
         player.agachado = false;
         player.saltando = true;
      } else {
        nivel.velocidad = 8;
        nivel.puntuacion = 0;
        nivel.muerto = false;
        enemigo.x = ancho+100;
        nube1.x = -200;
        nube2.x = -200;
        nube3.x = -200;
      }
    } if (evento.keyCode == 40) {
      player.agachado = true;
    }
}
// lógica enemigos---------------------------------------------
function logicaEnemigo () {
  if (enemigo.x < -100) {
    randomEnemigo();
    enemigo.x = ancho + 100;
    nivel.puntuacion += 1;
    if((nivel.puntuacion > 0) && ((nivel.puntuacion % 10) == 0)){
      nivel.velocidad++;
    }
  } else {
    enemigo.x = enemigo.x - nivel.velocidad;
  }
  dibujarEnemigo();
}
//Funcion lógica nube---------------------------------------------
function logicaNube () {
  if (nube1.x < -100){
    random();
    nube1.x = ranx;
    nube1.y = rany;
  }
  if (nube2.x < -100){
    random();
    nube2.x = ranx;
    nube2.y = rany;
  }
  if (nube3.x < -100){
    random();
    nube3.x = ranx;
    nube3.y = rany;
  }
  nube1.x = nube1.x - nivel.velocidad/5.5;
  nube2.x = nube2.x - nivel.velocidad/6;
  nube3.x = nube3.x - nivel.velocidad/6.3;
  dibujarNube();
}
//Funcion lógica suelo---------------------------------------------
function logicaSuelo () {
  if (suelograf.x < -600) {
    suelograf.x = 0;
  } else {
    suelograf.x = suelograf.x - nivel.velocidad;
  }
}
// Funcion lógica de colisión-------------------------------------
function colision () {
  if (ranz == 1){
    if (player.x + 50 > enemigo.x && player.y + 50 > enemigo.y) {
      if (player.x < enemigo.x +38) {
        nivel.velocidad =0;
        nivel.muerto = true;
      }
    }
  } else {
    if (player.agachado == false && enemigo.x < player.x + 50) {
      if (player.x < enemigo.x + 40) {
        nivel.velocidad =0;
        nivel.muerto = true;
      }
    }
    }
  }
// Se borra el canvas-------------------------------------------
function borrarCanvas () {
  lienzo.width = 700;
  lienzo.height = 300;
}
// funcion random------------------------------------------------
function random () {
  ranx = 4*( Math.ceil(Math.random()*100)+175);
  rany = (Math.ceil(Math.random()*100));
}
// funcion enemigo------------------------------------------------
function randomEnemigo () {
  ranz = Math.ceil((Math.ceil(Math.random()*10))/5);
  document.getElementById("z").innerHTML = ranz;
}
// lleva la puntuación-------------------------------------------
function puntuacion () {
  ctx.font = "30px impact";
  ctx.fillStyle = "#555555";
  ctx.fillText(`${nivel.puntuacion}`,600,50);
  if(nivel.muerto == true) {
    ctx.font = "60px impact";
    ctx.fillText(`GAME OVER`, 240, 150);
  }
}
