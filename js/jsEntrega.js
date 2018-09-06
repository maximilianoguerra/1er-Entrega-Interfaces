let canvasWidth = 700;
let canvasHeight = 700;
let imageBackup = new Image();
//variables para Paint
let pintar = false;
let borrar = false;
let xIni;
let yIni;
let xFin;
let yFin;
let lapiz=false;
let goma=false;
let color;
let widthLine;
let ajustX;
let ajustY;
//fin
//Funcionalidad paint
$(document).on('click','#lapiz',function (event) {
  event.preventDefault();
  cambiarALapiz();
});
function cambiarALapiz() {
  canvas.style.cursor =  "url(img/lapiz2.cur) 0 32,auto";
  lapiz=true;
  goma=false;
}
canvas.addEventListener('mousedown', function(event) {
  pintar=true;
  if (lapiz) {
    color="#0A0A0A";
    widthLine=2;
    ajustX =13;
    ajustY=0;
  }else if (goma) {
    color="#FFFFFF";
    widthLine=15;
    ajustX =13;
    ajustY=0;
  }
  xIni = event.layerX-ajustX;
  yIni = event.layerY+ajustY;
}, false);
canvas.addEventListener('mouseout', function(event){
  pintar=false;
}, false);
canvas.addEventListener('mousemove', function(event){
  if (pintar) {
          xFin = event.layerX-ajustX;
          yFin = event.layerY+ajustY;
          ctx.beginPath();
          ctx.moveTo(xIni, yIni);
          ctx.lineTo(xFin, yFin);
          ctx.lineWidth = widthLine;
          ctx.strokeStyle = color;
          xIni = xFin;
          yIni = yFin;
          ctx.stroke();
        }
}, false);
canvas.addEventListener('mouseup', function(event){
  pintar = false;
}, false);
$(document).on('click','#goma',function (event) {
  event.preventDefault();
  cambiarAGoma();
});
function cambiarAGoma() {
  canvas.style.cursor =  "url(img/goma-de-borrar.cur) 0 20 ,auto";
  goma=true;
  lapiz=false;
}
//Fin funcionalidad Paint
var ctx = document.getElementById("canvas").getContext("2d");
let imageData = ctx.createImageData(canvasWidth,canvasHeight);
canvasWithe(imageData);
function canvasWithe(imageData) {
  for (var x = 0; x < imageData.width; x++) {
    for (var y = 0; y < imageData.width; y++) {
      setPixel(imageData,x,y,255,255,255,255);
    }
  }
  ctx.putImageData(imageData,0,0);
}


//Manejo de imagenes
$(document).on('submit','.formFiltrar', function(event){
      event.preventDefault();
      let image1 = new Image();
      var file    = document.querySelector('input[type=file]').files[0];
      var reader  = new FileReader();
      reader.onloadend = function () {
        image1.src = reader.result;
      }
      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
      }
      image1.onload = function(){
        imageBackup=this;
        myDrawImageMethod(this);
      };
      $("#foto").val("");
      return image1;
  });
function myDrawImageMethod(image) {
  let imageData = ctx.createImageData(canvasWidth,canvasHeight);
  canvasWithe(imageData)
  if(image.width<canvasWidth && image.height<canvasHeight){
    $('#canvas').attr("width",image.width);
    $('#canvas').attr("height",image.height);
    ctx.drawImage(image,0,0,image.width,image.height);
  }else if (canvasWidth < image.width && canvasHeight < image.height) {
    mantenerPropImg(image);
  }else if (canvasWidth < image.width) {
    mantenerPropImg(image)
  }else {
    mantenerPropImg(image);
  }
};
function mantenerPropImg(image) {
  let anchoImg= image.width;
  let altoImg= image.height;
  let anchoCanvas= canvas.width;
  let altoCanvas= canvas.height;
  let aspectRatio= anchoImg/altoImg;
  if(anchoImg>altoImg){
    $('#canvas').attr("width",anchoCanvas);
    $('#canvas').attr("height",anchoCanvas/aspectRatio);
    ctx.drawImage(image, 0, 0, anchoCanvas, anchoCanvas/aspectRatio);
  }
  else{
    $('#canvas').attr("width",altoCanvas*aspectRatio);
    $('#canvas').attr("height",altoCanvas);
    ctx.drawImage(image, 0, 0, altoCanvas*aspectRatio, altoCanvas);
  }
}
$(document).on('click','#resetLienzo',function (event) {
  event.preventDefault();
  $('#canvas').attr("width",canvasWidth);
  $('#canvas').attr("height",canvasHeight);
  canvasWithe(imageData);
});
$(document).on('click','#Restaurar',function (event) {
  event.preventDefault();
  canvasWithe(imageData);
  myDrawImageMethod(imageBackup);
});
$(document).on('click','#FilBrillo',function (event) {
  event.preventDefault();
  filtroBrillo.filtroImg();
});
$(document).on('click','#FilNegativo',function (event) {
  event.preventDefault();
  filtroNegativo.filtroImg();
});
$(document).on('click','#FilBinario',function (event) {
  event.preventDefault();
  filtroBinario.filtroImg();
});
$(document).on('click','#FilSepia',function (event) {
  event.preventDefault();
  filtroSepia.filtroImg();
});
$(document).on('click','#FilGris',function (event) {
  event.preventDefault();
  filtroGris.filtroImg();
});
$(document).on('click','#FilBordes',function (event) {
  event.preventDefault();
  filtroGris.filtroImg();
  filtroDetectBordes.filtroImg();
});
$(document).on('click','#FilBlur',function (event) {
  event.preventDefault();
  filtroBlur.filtroImg();
});
$(document).on('click','#Filsuave',function (event) {
  event.preventDefault();
  filtroSuavisado.filtroImg();
});
$(document).on('click','#guardarImg',function (event) {
  // event.preventDefault();
  var canvas = $("#canvas")[0];
  var imagen = canvas.toDataURL("image/png");
  this.href = imagen;
});
class  Filtro {
  Filtro() {}
  filtroImg() {
    let imageData = ctx.getImageData(0,0,canvasWidth,canvasWidth);
    for (var x = 0; x < canvasWidth; x++) {
      for (var y = 0; y < canvasWidth; y++) {
      let rgb = getPixel(imageData,x,y);
      let pixelMod = this.filterType(rgb);
      setPixel(imageData,x,y,pixelMod[0],pixelMod[1],pixelMod[2],255);
      }
    }
    ctx.putImageData(imageData,0,0);
  }
  filterType(rgb) {}
}
class FiltroBrillo extends Filtro{
  FiltroBrillo() {}
  filterType(rgb){
    rgb[0]=rgb[0]+(rgb[0]/100)*10;
    rgb[1]=rgb[1]+(rgb[1]/100)*10;
    rgb[2]=rgb[2]+(rgb[2]/100)*10;
    return rgb;
  }
}
let  filtroBrillo = new FiltroBrillo();

class FiltroNegativo extends Filtro{
  FiltroNegativo() {}
  filterType(rgb) {
    rgb[0]=255-rgb[0];
    rgb[1]=255-rgb[1];
    rgb[2]=255-rgb[2];
    return rgb;
  }
}
let filtroNegativo = new FiltroNegativo();

class FiltroBinario extends Filtro{
  FiltroBinario() {}
  filterType(rgb) {
    let binario=(rgb[0]+rgb[1]+rgb[2])/3
    if (binario<128) {
      binario=0;
    }else {
      binario=255;
    }
    return [binario,binario,binario];
  }
}
let filtroBinario = new FiltroBinario();
class FiltroSepia extends Filtro {
  FiltroSepia() {}
  filterType(rgb){
    let red = 0.393*rgb[0] + 0.769*rgb[1] + 0.189*rgb[2]
    let green = 0.349*rgb[0] + 0.686*rgb[1] + 0.168*rgb[2]
    let blue  = 0.272*rgb[0] + 0.534*rgb[1]+ 0.131*rgb[2]
    return [red,green,blue];
  }
}
let filtroSepia = new FiltroSepia();

class FiltroGris extends Filtro{
  FiltroGris() {}
  filterType(rgb) {
    let suma=rgb[0]+rgb[1]+rgb[2];
    let promedio=suma/rgb.length;
    return [promedio,promedio,promedio];
  }
}
let filtroGris = new FiltroGris();

class FiltroAvanzados {
  FiltroAvanzados() {}
  filtroImg() {
    let imageData = ctx.getImageData(0,0,canvasWidth,canvasWidth);
    let imagencopia = cloneImage(imageData);
    for (var x = 0; x < canvasWidth; x++) {
      for (var y = 0; y < canvasWidth; y++) {
        let z1 = getPixel(imageData,x-1,y-1);  //{z1,z2,z3}
        let z2 = getPixel(imageData,x,y-1);    //{z4,z5,z6}
        let z3 = getPixel(imageData,x+1,y-1);  //{z7,z8,z9}
        let z4 = getPixel(imageData,x-1,y);
        let z5 = getPixel(imageData,x,y);
        let z6 = getPixel(imageData,x+1,y);
        let z8 = getPixel(imageData,x,y+1);
        let z7 = getPixel(imageData,x-1,y+1);
        let z9 = getPixel(imageData,x+1,y+1);
        let matPixel = [z1,z2,z3,z4,z5,z6,z7,z8,z9]
        let resultado = this.getPixelWithFilter(matPixel,x,y);
        setPixel(imagencopia,x,y,resultado[0],resultado[1],resultado[2],255)
      }
    }
    ctx.putImageData(imagencopia,0,0);
  }
}
class FiltroDetectBordes extends FiltroAvanzados{
  // let mascara = [-1,0,1]
  FiltroDetectBordes() {}
  getPixelWithFilter(matPixel){
    let matConvolucionX = [-1,0,1,-2,0,2,-1,0,1]
    let matConvolucionY = [-1,-2,-1,0,0,0,1,2,1]
    let resultadoy=0;
    let resultadox=0;
    let aux;
    for (var i = 0; i < matPixel.length; i++) {
      aux = matPixel[i];
      resultadox+=(aux[0]*matConvolucionX[i]);
      resultadoy+=(aux[0]*matConvolucionY[i]);
    }
    let resultado = Math.sqrt(Math.pow(resultadox,2)+Math.pow(resultadoy,2));
    return [resultado,resultado,resultado];//retorno de esta manera para poder trabajar con polimorfismo
  }
}
let filtroDetectBordes = new FiltroDetectBordes();

class FiltroBlur extends FiltroAvanzados{
  FiltroBlur() {}
  getPixelWithFilter(matPixel){
    let blur=[0,0,0];
    for (var i = 0; i < matPixel.length; i++) {
      blur[0]=blur[0]+matPixel[i][0]/9;
      blur[1]=blur[1]+matPixel[i][1]/9;
      blur[2]=blur[2]+matPixel[i][2]/9;
    }
    return blur;
  }
}
let filtroBlur = new FiltroBlur();

function getPixel(imageData,x,y) {
  let index = (x + y * imageData.width) * 4;
  let red = imageData.data[index+0];
  let green = imageData.data[index+1];
  let blue = imageData.data[index+2];
  return [red,green,blue];
}
function cloneImage(imageData){
  let copia= ctx.createImageData(canvasWidth,canvasWidth);
  for (var x = 0; x < canvasWidth; x++) {
    for (var y = 0; y < canvasWidth; y++) {
      let rgb =getPixel(imageData ,x,y);
      setPixel(copia,x,y,rgb[0],rgb[1],rgb[2],255)
    }
  }
  return copia;
}

function setPixel(imageData,x,y,r,g,b,a) {
  index = (x + y * imageData.width) * 4;
  imageData.data[index+0]=r;
  imageData.data[index+1]=g;
  imageData.data[index+2]=b;
  imageData.data[index+3]=a;

};
//fin de Manejo de imagenes
