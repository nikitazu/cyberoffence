function app_mouse_init() {
  let x0 = 0;
  let y0 = 0;
  let dx = 0;
  let dy = 0;
  
  function update(x, y) {
    
    if (x0 > 0) {
      dx = x - x0;
    }
    
    if (y0 > 0) {
      dy = y - y0;
    }
    
    x0 = x;
    y0 = y;
	}

	return {
	  update   : update
  , getDx    : () => dx
	, getDy    : () => dy
  };
}
