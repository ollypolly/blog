// NOTE: This is a simulation of what HTML-in-Canvas does.
// The real API (chrome://flags/#canvas-draw-element) renders
// actual live DOM — not a static screenshot like html2canvas.

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const input = document.getElementById('myInput') as HTMLInputElement;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#1e293b';
  (ctx as any).roundRect(10, 10, 280, 130, 8);
  ctx.fill();

  ctx.fillStyle = '#334155';
  (ctx as any).roundRect(20, 40, 260, 36, 4);
  ctx.fill();

  ctx.fillStyle = 'white';
  ctx.font = '14px sans-serif';
  ctx.fillText(input.value || 'Edit me!', 32, 64);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px sans-serif';
  ctx.fillText('↑ rendered in canvas (simulated)', 20, 120);

  requestAnimationFrame(draw);
}

input.addEventListener('input', draw);
draw();
