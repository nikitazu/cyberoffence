function app_dom_init(
    window
  , document
  ) {
  
  this.getWindowAspectRatio = () =>
    window.innerWidth / window.innerHeight;
  
  this.getWindowInnerWidth = () =>
    window.innerWidth;
  
  this.getWindowInnerHeight = () =>
    window.innerHeight;
  
  this.documentAppend = element =>
    document.body.appendChild(element);
  
  this.getCodeById = id =>
    document.getElementById(id).innerHTML;
  
  this.getTicks = () =>
    performance.now();
  
  this.setOnMouseMove = f =>
    document.onmousemove = f;

  this.setOnKey = f => {
    const isDown = true;
    document.onkeydown = e => f(e, isDown);
    document.onkeyup   = e => f(e, !isDown);
  };
}
