
$(document).on('click','#mouse',function (event) {
  event.preventDefault();
  cambiarALapiz();
});
function cambiarALapiz() {
  document.body.style.cursor =  "url(lapiz32p.png),auto";
}
