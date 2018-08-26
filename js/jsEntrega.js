
$(document).on('click','#lapiz',function (event) {
  event.preventDefault();
  cambiarALapiz();
});
function cambiarALapiz() {
  document.body.style.cursor =  "url(img/lapiz32p.png),auto";
  canvas.addEventListener('mousemove', function(event) {
      let imageData = ctx.getImageData(0,0,1000,1000);
      setPixel(imageData,event.layerX,event.layerY,0,0,0,255);
      setPixel(imageData,event.layerX,event.layerY-1,0,0,0,255);
      setPixel(imageData,event.layerX,event.layerY+1,0,0,0,255);
      setPixel(imageData,event.layerX-1,event.layerY,0,0,0,255);
      setPixel(imageData,event.layerX-1,event.layerY-1,0,0,0,255);
      setPixel(imageData,event.layerX-1,event.layerY+1,0,0,0,255);
      setPixel(imageData,event.layerX+1,event.layerY,0,0,0,255);
      setPixel(imageData,event.layerX+1,event.layerY-1,0,0,0,255);
      setPixel(imageData,event.layerX+1,event.layerY+1,0,0,0,255);
      ctx.putImageData(imageData,0,0);

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
      setPixel(imageData,event.layerX,event.layerY,255,255,255,255);
      setPixel(imageData,event.layerX,event.layerY-1,255,255,255,255);
      setPixel(imageData,event.layerX,event.layerY+1,255,255,255,255);
      setPixel(imageData,event.layerX-1,event.layerY,255,255,255,255);
      setPixel(imageData,event.layerX-1,event.layerY-1,255,255,255,255);
      setPixel(imageData,event.layerX-1,event.layerY+1,255,255,255,255);
      setPixel(imageData,event.layerX+1,event.layerY,255,255,255,255);
      setPixel(imageData,event.layerX+1,event.layerY-1,255,255,255,255);
      setPixel(imageData,event.layerX+1,event.layerY+1,255,255,255,255);
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
// function myDrawImageMethod(image) {
//   ctx.drawImage(image,0,0,700,700);
// };
// let image1 = new Image();
// image1.src="enBlanco.png"
// image1.onload = function(){
//   myDrawImageMethod(this);
//   let imageData = ctx.getImageData(0,0,700,700);
//   // tonos(imageData);
//   ctx.putImageData(imageData,0,0);
// };

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
  ctx.drawImage(image,0,0,700,700);
};
