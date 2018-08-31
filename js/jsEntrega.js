var canvasWidth = 1000;
var canvasHeight = 1000;
var imageBackup = new Image();
$(document).on('click','#lapiz',function (event) {
  event.preventDefault();
  cambiarALapiz();
});
function cambiarALapiz() {
  document.body.style.cursor =  "url(img/lapiz32p.png),auto";
  canvas.addEventListener('mousemove', function(event) {
      let imageData = ctx.getImageData(0,0,canvasWidth,canvasWidth);
      ctx.fillStyle="#0A0A0A0";
      ctx.fillRect(event.layerX, event.layerY+20, 16, 16);
    }, false);
}
$(document).on('click','#goma',function (event) {
  event.preventDefault();
  cambiarAGoma();
});
function cambiarAGoma() {
  document.body.style.cursor =  "url(img/goma-de-borrar32p.png),auto";
  canvas.addEventListener('mousemove', function(event) {
      let imageData = ctx.getImageData(0,0,canvasWidth,canvasWidth);
      ctx.fillStyle="#FFFFFF";
      ctx.fillRect(event.layerX, event.layerY+20, 16, 16);
      for (var i = 0; i < array.length; i++) {
        setPixel(imageData,i,i,255,255,255,255);
      }
      ctx.putImageData(imageData,0,0);

    }, false);
}
var ctx = document.getElementById("canvas").getContext("2d");
let imageData = ctx.createImageData(canvasWidth,canvasWidth);
for (var x = 0; x < imageData.width; x++) {
  for (var y = 0; y < imageData.width; y++) {
    setPixel(imageData,x,y,255,255,255,255);
  }
};
ctx.putImageData(imageData,0,0);

  function setPixel(imageData,x,y,r,g,b,a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0]=r;
    imageData.data[index+1]=g;
    imageData.data[index+2]=b;
    imageData.data[index+3]=a;

  };
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
      $("#consumo").val("");
      return image1;
  });
function myDrawImageMethod(image) {
  if(image.width<canvasWidth && image.height<1000){
    ctx.drawImage(image,0,0,image.width,image.height);
  }else if (canvasWidth < image.width && 1000 < image.height) {
    ctx.drawImage(image,0,0,canvasWidth,canvasWidth);
  }else if (canvasWidth < image.width) {
    ctx.drawImage(image,0,0,canvasWidth,image.height);
  }else {
    ctx.drawImage(image,0,0,image.width,canvasWidth);
  }
};
$(document).on('click','#Restaurar',function (event) {
  event.preventDefault();
  myDrawImageMethod(imageBackup);
});
$(document).on('click','#FilBrillo',function (event) {
  event.preventDefault();
  let  filtro = new FiltroBrillo();
  filtro.filtroImg();
});
$(document).on('click','#FilNegativo',function (event) {
  event.preventDefault();
  let filtro = new FiltroNegativo();
  filtro.filtroImg();
});
$(document).on('click','#FilBinario',function (event) {
  event.preventDefault();
  let filtro = new FiltroBinario();
  filtro.filtroImg();
});
$(document).on('click','#FilSepia',function (event) {
  event.preventDefault();
  let filtro = new FiltroSepia();
  filtro.filtroImg();
});
$(document).on('click','#FilGris',function (event) {
  event.preventDefault();
  let filtro = new FiltroGris();
  filtro.filtroImg();
});
$(document).on('click','#FilBordes',function (event) {
  event.preventDefault();
  let filtro = new FiltroDetectBordes();
  filtro.filtroImg();
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
class FiltroNegativo extends Filtro{
  FiltroNegativo() {}
  filterType(rgb) {
    rgb[0]=255-rgb[0];
    rgb[1]=255-rgb[1];
    rgb[2]=255-rgb[2];
    return rgb;
  }
}
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
class FiltroSepia extends Filtro {
  FiltroSepia() {}
  filterType(rgb){
    let red = 0.393*rgb[0] + 0.769*rgb[1] + 0.189*rgb[2]
    let green = 0.349*rgb[0] + 0.686*rgb[1] + 0.168*rgb[2]
    let blue  = 0.272*rgb[0] + 0.534*rgb[1]+ 0.131*rgb[2]
    return [red,green,blue];
  }
}
class FiltroGris extends Filtro{
  FiltroGris() {}
  filterType(rgb) {
    let suma=rgb[0]+rgb[1]+rgb[2];
    let promedio=suma/rgb.length;
    return [promedio,promedio,promedio];
  }
}
class FiltroDetectBordes {
  // let mascara = [-1,0,1]
  FiltroDetectBordes() {}
  filtroImg() {

    let filtro = new FiltroGris();
    filtro.filtroImg();
    let imageData = ctx.getImageData(0,0,canvasWidth,canvasWidth);
    let imagencopia = this.cloneImage(imageData);
    for (var x = 0; x < canvasWidth; x++) {
      for (var y = 0; y < canvasWidth; y++) {
        let rgb1 = getPixel(imageData,x-1,y);
        let rgb2 = getPixel(imageData,x+1,y);
        let rgb3 = getPixel(imageData,x-1,y-1);
        let rgb4 = getPixel(imageData,x+1,y+1);
        let rgb5 = getPixel(imageData,x-1,y+1);
        let rgb6 = getPixel(imageData,x+1,y-1);
        let resultado = (rgb1[0]*-1)+(rgb2[0]*1)+(rgb3[0]*-1)+(rgb4[0]*1)+(rgb5[0]*-1)+(rgb6[0]*1);
        if (resultado<0) {
          resultado=resultado*-1;
        }

        setPixel(imagencopia,x,y,resultado,resultado,resultado,255)


      }
    }
    ctx.putImageData(imagencopia,0,0);
  }
  cloneImage(imageData){
    let copia= ctx.createImageData(1000,1000);
    for (var x = 0; x < canvasWidth; x++) {
      for (var y = 0; y < canvasWidth; y++) {
        let rgb =getPixel(imageData ,x,y);
        setPixel(copia,x,y,rgb[0],rgb[1],rgb[2],255)
      }
    }
    return copia;
  }
  filterType(rgb){

  }
}
function getPixel(imageData,x,y) {
  let index = (x + y * imageData.width) * 4;
  let red = imageData.data[index+0];
  let green = imageData.data[index+1];
  let blue = imageData.data[index+2];
  return [red,green,blue];
}
// for (var x = 0; x < canvasWidth; x++) {
//   for (var y = 0; y < canvasWidth; y++) {
//     let rgb1 = getPixel(imageData,x-1,y);
//     let rgb2 = getPixel(imageData,x+1,y);
//     let rgb3 = getPixel(imageData,x-1,y-1);
//     let rgb4 = getPixel(imageData,x+1,y+1);
//     let rgb5 = getPixel(imageData,x-1,y+1);
//     let rgb6 = getPixel(imageData,x+1,y-1);
//     let resultado = (rgb1[0]*-1)+(rgb2[0]*1)+(rgb3[0]*-1)+(rgb4[0]*1)+(rgb5[0]*-1)+(rgb6[0]*1);
//     if (resultado<0) {
//       resultado=resultado*-1;
//     }
//
//     setPixel(imageData,x,y,resultado,resultado,resultado,255)
//
//
//   }
// }
// ctx.putImageData(imageData,0,0);
// }
// function onMouseMove(event) {
//   si hay PuntoANTERIOR
//   ctx.be
// }
