function app_dom_init(
    window
  , document
  ) {
  
  const getWindowAspectRatio = () => window.innerWidth / window.innerHeight;
  const getWindowInnerWidth = () => window.innerWidth;
  const getWindowInnerHeight = () => window.innerHeight;
  
  function documentAppend(element) {
    document.body.appendChild(element);  
  }
  
  function getCodeById(id) {
    return document.getElementById(id).innerHTML;
  }
  
  function getTicks() {
    return performance.now();
  }
  
  function setOnMouseMove(f) {
    document.onmousemove = f;
  }
  
  function setOnKeyDown(f) {
    document.onkeydown = f;
  }
  
  function setOnKeyUp(f) {
    document.onkeyup = f;
  }
  
  return {
    getWindowAspectRatio : getWindowAspectRatio
  , getWindowInnerWidth  : getWindowInnerWidth
  , getWindowInnerHeight : getWindowInnerHeight
  , documentAppend       : documentAppend
  , getCodeById          : getCodeById
  , getTicks             : getTicks
  , setOnMouseMove       : setOnMouseMove
  , setOnKeyDown         : setOnKeyDown
  , setOnKeyUp           : setOnKeyUp
  };
}
