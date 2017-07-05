let x0 = 0;
let y0 = 0;
let dx = 0;
let dy = 0;

export function update(x, y) {
  if (x0 > 0) {
    dx = x - x0;
  }

  if (y0 > 0) {
    dy = y - y0;
  }
  
  x0 = x;
  y0 = y;
}

export const getDx = () => dx;
export const getDy = () => dy;
