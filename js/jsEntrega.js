
$(document).on('click','#lapiz',function (event) {
  event.preventDefault();
  cambiarALapiz();
});
function cambiarALapiz() {
  document.body.style.cursor =  "url(lapiz32p.png),auto";
}
$(document).on('click','#goma',function (event) {
  event.preventDefault();
  cambiarAGoma();
});
function cambiarAGoma() {
  document.body.style.cursor =  "url(goma-de-borrar32p.png),auto";
}
var ctx = document.getElementById("canvas").getContext("2d");
function myDrawImageMethod(image) {
  ctx.drawImage(image,0,0,700,700);
};
let image1 = new Image();
image1.src="enBlanco.png"
image1.onload = function(){
  myDrawImageMethod(this);
  let imageData = ctx.getImageData(0,0,700,700);
  // tonos(imageData);
  ctx.putImageData(imageData,0,0);
};
canvas.addEventListener('mousemove', function(event) {
    let imageData = ctx.getImageData(0,0,1000,1000);
    setPixel(imageData,event.layerX,event.layerY,0,0,0,255);
    ctx.putImageData(imageData,0,0,0,0,1000,1000);

  }, false);
  function setPixel(imageData,x,y,r,g,b,a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0]=r;
    imageData.data[index+1]=g;
    imageData.data[index+2]=b;
    imageData.data[index+3]=a;

  };
