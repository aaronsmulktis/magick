document.addEventListener("DOMContentLoaded", function(event) {

  window.requestAnimFrame = (function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
          window.setTimeout(callback, 1000 / 60);
      };
  })();

  var canvas = document.querySelector('#clouds');
  var w = window.innerWidth;
  var h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  var ctx = canvas.getContext('2d');

  var time = Date.now();
  var buffer = ctx.createImageData(w, h);

  var PI = Math.PI;
  var TWO_PI = PI * 2;
  var N = 10;

  function render(time, fragcoord) {
      var light_pos = [w / 2 + w * Math.sin(time) * 0.3, h / 2 + h * Math.cos(time) * 0.5];
      var intensity = 100 * Math.abs(Math.tan((time + 2) / 10));
      var dist = Math.sqrt(Math.pow(fragcoord[0] - light_pos[0], 2) + Math.pow(fragcoord[1] - light_pos[1], 2));
      var light_color = [0.1, 0.8, 0.5];
      var alpha = 0.5 / (dist / intensity);
      return [light_color[0] * alpha, light_color[1] * alpha, light_color[2] * alpha, alpha * alpha];
  };

  function animate() {
      var delta = (Date.now() - time) / 1000;
      buffer = ctx.createImageData(w, h);
      ctx.clearRect(0, 0, w, h);
      for (var x = 0; x < w; x++) {
          for (var y = 0; y < h; y++) {
              var ret = render(delta, [x, y]);
              var i = (y * buffer.width + x) * 4;
              buffer.data[i] = ret[0] * 255;
              buffer.data[i + 1] = ret[1] * 255;
              buffer.data[i + 2] = ret[2] * 255;
              buffer.data[i + 3] = ret[3] * 255;
          }
      }
      ctx.putImageData(buffer, 0, 0);
      requestAnimFrame(animate);
  };

  window.onresize = function () {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
  };

  animate();

});