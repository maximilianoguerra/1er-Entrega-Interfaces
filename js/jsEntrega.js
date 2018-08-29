
$(document).on('click','#lapiz',function (event) {
  event.preventDefault();
  cambiarALapiz();
});
function cambiarALapiz() {
  document.body.style.cursor =  "url(img/lapiz32p.png),auto";
  canvas.addEventListener('mousemove', function(event) {
      let imageData = ctx.getImageData(0,0,1000,1000);
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
      let imageData = ctx.getImageData(0,0,1000,1000);
      ctx.fillStyle="#FFFFFF";
      ctx.fillRect(event.layerX, event.layerY+20, 16, 16);
      for (var i = 0; i < array.length; i++) {
        setPixel(imageData,i,i,255,255,255,255);
      }
      ctx.putImageData(imageData,0,0);

    }, false);
}
var ctx = document.getElementById("canvas").getContext("2d");
let imageData = ctx.createImageData(1000,1000);
for (var x = 0; x < imageData.width; x++) {
  for (var y = 0; y < imageData.width; y++) {
    setPixel(imageData,x,y,255,255,255,255);
  }
};
ctx.putImageData(imageData,10,10);

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
    myDrawImageMethod(this);
  };
  });
function myDrawImageMethod(image) {
  ctx.drawImage(image,0,0,1000,1000);
};
$(document).on('click','#FilBrillo',function (event) {
  event.preventDefault();
  filtroBrillo();
});
function filtroBrillo(){
  let imageData = ctx.getImageData(0,0,1000,1000);
  for (var x = 0; x < 1000; x++) {
    for (var y = 0; y < 1000; y++) {
    let rgb = getPixel(imageData,x,y);
    let pixelMod = brillo(rgb);
    setPixel(imageData,x,y,pixelMod[0],pixelMod[1],pixelMod[2],255);
    }
  }
  ctx.putImageData(imageData,0,0);
}
function getPixel(imageData,x,y) {
  let index = (x + y * imageData.width) * 4;
  let red = imageData.data[index+0];
  let green = imageData.data[index+1];
  let blue = imageData.data[index+2];
  return [red,green,blue];
}
function brillo(rgb){
  rgb[0]=rgb[0]+(rgb[0]/100)*10;
  rgb[1]=rgb[1]+(rgb[1]/100)*10;
  rgb[2]=rgb[2]+(rgb[2]/100)*10;
  return rgb;
}
