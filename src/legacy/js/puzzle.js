const rows = 2; 
const cols = 7;
const lineWidth = 2;

function generatePatterns(rows, cols) {
  const rnd = () => (Math.random() < 0.5 ? -1 : 1);
  const patterns = [];
  for (let i = 0; i < rows; i++) {
    patterns[i] = [];
    for (let j = 0; j < cols; j++) {
      let top, right, bottom, left;
      if (i == 0) top = 0;
      else top = patterns[i - 1][j].bottom;
      if (i == rows - 1) bottom = 0;
      else bottom = rnd();
      if (j == 0) left = 0;
      else left = patterns[i][j - 1].right;
      if (j == cols - 1) right = 0;
      else right = rnd();
      patterns[i][j] = { top, right, bottom, left };
    }
  }
  return patterns;
}

//
//
//       YA i misspelled "puzzle", LOL     
//
//
function drawPizzles(elcanvas, patterns, luckyIndice, rows, cols) {
  const {width:canw, height:canh} = elcanvas.getBoundingClientRect();
  elcanvas.width = canw;
  elcanvas.height = canh;
  const ctx = elcanvas.getContext("2d");
  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  ctx.lineWidth = lineWidth;
  //draw
  const pizzlew = canw / cols;
  const pizzleh = canh / rows;
  const r = Math.min(pizzlew, pizzleh) / 6;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const pattern = patterns[i][j];
      ctx.beginPath();
      ctx.moveTo(j * pizzlew, i * pizzleh);
      if (pattern.top == 0) ctx.lineTo((j + 1) * pizzlew, i * pizzleh);
      else {
        const isccw = pattern.top == -1;
        ctx.lineTo((j + 0.5) * pizzlew - r, i * pizzleh);
        ctx.ellipse(
          (j + 0.5) * pizzlew,
          i * pizzleh,
          r,
          r,
          0,
          Math.PI,
          0,
          isccw
        );
        ctx.lineTo((j + 1) * pizzlew, i * pizzleh);
      }
      if (pattern.right == 0) {
        ctx.lineTo((j + 1) * pizzlew, (i + 1) * pizzleh);
      } else {
        const isccw = pattern.right == 1;
        ctx.lineTo((j + 1) * pizzlew, (i + 0.5) * pizzleh - r);
        ctx.ellipse(
          (j + 1) * pizzlew,
          (i + 0.5) * pizzleh,
          r,
          r,
          Math.PI / 2,
          Math.PI,
          0,
          isccw
        );
        ctx.lineTo((j + 1) * pizzlew, (i + 1) * pizzleh);
      }
      if (pattern.bottom == 0) {
        ctx.lineTo(j * pizzlew, (i + 1) * pizzleh);
      } else {
        const isccw = pattern.bottom == 1;
        ctx.lineTo((j + 0.5) * pizzlew + r, (i + 1) * pizzleh);
        ctx.ellipse(
          (j + 0.5) * pizzlew,
          (i + 1) * pizzleh,
          r,
          r,
          0,
          0,
          Math.PI,
          isccw
        );
        ctx.lineTo(j * pizzlew, (i + 1) * pizzleh);
      }
      if (pattern.left == 0) {
        ctx.lineTo(j * pizzlew, i * pizzleh);
      } else {
        const isccw = pattern.left == -1;
        ctx.lineTo(j * pizzlew, (i + 0.5) * pizzleh + r);
        ctx.ellipse(
          j * pizzlew,
          (i + 0.5) * pizzleh,
          r,
          r,
          Math.PI / 2,
          0,
          Math.PI,
          isccw
        );
        ctx.lineTo(j * pizzlew, i * pizzleh);
      }
      
      ctx.stroke();
      if (luckyIndice.indexOf(i * cols + j) !== -1) ctx.fill();
    }
  }
}


//drawPizzles(elcanvas);
//const dataurl = elcanvas.toDataURL();
const patterns = generatePatterns(rows, cols);
const indice = [];
for (let i = 0; i < rows*cols ; i++)
  indice.push(i);
let selectedIndexCount = 0;

(function f() {
  //requestAnimationFrame(f);
  
  const luckyIndex = Math.random() * (indice.length - selectedIndexCount) | 0;
  swap(indice, luckyIndex, indice.length -1 - selectedIndexCount);
  selectedIndexCount += 1;
  
  const luckyIndice = indice.slice(-1 * selectedIndexCount);
  drawPizzles(elcanvas,patterns,luckyIndice,rows,cols);
  const dataurl = elcanvas.toDataURL();
  elimg.style.webkitMaskImage = `url(${dataurl})`;
  elimg.style.maskSize = `100% 100%`;
  
  if (selectedIndexCount == rows * cols)
    document.body.classList.add("done");
  else 
    setTimeout(f, 1000/2);
  
})();

function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}