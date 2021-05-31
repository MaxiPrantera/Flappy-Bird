var contexto = document.getElementById("lienzoJuego")
var ctx = contexto.getContext("2d")
var WIDTH = 300;
var HEIGHT = 530;
var CANVAS_WIDTH = 300;
var CANVAS_HEIGHT = 530;
ctx.width = WIDTH;
ctx.height = HEIGHT;
//VARIABLES
var score = 0
var gravedad = 2.6
var FPS = 60
var personaje = {
    x:50,
    y:150,
    w:50,
    h:50
}
var tuberias = new Array() //conjuntos de variables dentro del array
tuberias[0] = { //esto hace que el 0 hace referencia al 1er elemento del array
    x:ctx.width, //a la 1ra tuberia, la posicion de x sea la del anchura del canvas
    y:0
}
//VARIABLES AUDIOS
var punto = new Audio()
punto.src = "audios/punto.mp3"

//VARIABLES IMAGENES
var bird = new Image()
bird.src = "imagenes/bird.png"

var background = new Image()
background.src = "imagenes/background.png"

var tuberiaNorte = new Image()
tuberiaNorte.src = "imagenes/tuberiaNorte.png"

var tuberiaSur = new Image()
tuberiaSur.src = "imagenes/tuberiaSur.png"

var suelo = new Image()
suelo.src = "imagenes/suelo.png"

//CONTROL
function presionar(){ //hago que suba 25 pixeles
    personaje.y -=45
}
resize()
function resize(){
    CANVAS_HEIGHT = window.innerHeight; //hace referencia a toda la altura de la ventana
    CANVAS_WIDTH = window.innerWidth;//lo mismo con la anchura

    contexto.width = WIDTH;
    contexto.height = HEIGHT;

    contexto.style.height = ""+CANVAS_HEIGHT+"px"; //esto es igual a un zoom de tantos pixeles para que el juego este bien
}

//BUCLE

setInterval(loop,1000/FPS)

function loop(){
    ctx.clearRect(0, 0,300,530) //forma de limpiar todo un rectangulo
    //FONDO
    ctx.drawImage(background, 0, 0)
    ctx.drawImage(suelo,0,ctx.height - suelo.height)
   
    //PERSONAJE

    ctx.drawImage(bird, personaje.x, personaje.y)

    //TUBERIAS
    for(var i = 0; i < tuberias.length; i++){

        var constante = tuberiaNorte.height + 80 //constante es la altura de la tuberia mas 80 pix (hace que se dibuje la tuberia del sur luego de que se dibuje la tuberia del norte)
        ctx.drawImage(tuberiaNorte,tuberias[i].x, tuberias[i].y)
        ctx.drawImage(tuberiaSur, tuberias[i].x, tuberias[i].y + constante)
        tuberias[i].x-- // para que vaya para la izq

        if(tuberias[i].y + tuberiaNorte.height < 80){ //si cualquiera de las tuberias es menor a 80px quiero que tuberia y se punga en 0 y no en donde aparecio ( esto es para que se vea el total de la tuberia y no cortada)
            tuberias[i].y = 0
        }

        if(tuberias[i].x == 150){ //cada vez que una tuberia llegue a 150px hacemos un push de una nueva tuberia
            tuberias.push({
                x:ctx.width,
                y: Math.floor(Math.random()*tuberiaNorte.height) - tuberiaNorte.height //nos da valores de entre 0 y 1 y lo multiplico por la tuberia asi lo puedo ver a simple vista
                //math.floor redondea el numero para abajo o para arriba
            }) //push sirve para meter elementos dentro del array
        }
        //COLISIONES
        if(personaje.x + bird.width >= tuberias[i].x && personaje.x <= tuberias[i].x + tuberiaNorte.width && (personaje.y <= tuberias[i].y + tuberiaNorte.height || personaje.y + bird.height >= tuberias[i].y + constante) || personaje.y + bird.height >= ctx.height - suelo.height){
            location.reload() //que se recague la pagina
        }
        //la primera condicion es para si el pajaro toca la tuberia del lado derecho e izq
        //la segunda condicion es lo mismo pero para el eje y
        //la ultima linea es la colision con el suelo
        //luego que se recargue
        if(tuberias[i].x == personaje.x){ //pongo 50 xq justo es la posicion en x donde comienza el personaje
            score++
            punto.play()//cada vez que sumo un punto reproducime el audio
        }

    }
    //CONDICIONES
    personaje.y += gravedad
    ctx.fillStyle ="rgna(0,0,0,1)"
    ctx.font = "25px Arial"
    ctx.fillText("Score: " + score, 10, ctx.height - 40)
}

//EVENTO
window.addEventListener("resize", resize)
window.addEventListener("keydown",presionar)