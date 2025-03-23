// script.js (versão sem imagem, só CSS + JS 🌸)
const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const petals = [];
const colors = ['#ffb6c1', '#ffc0cb', '#ffe4e1', '#ff69b4', '#f8c8dc'];

class Petal {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.size = 8 + Math.random() * 12;
    this.speedY = 1 + Math.random() * 2;
    this.speedX = Math.random() * 1 - 0.5;
    this.opacity = 0.4 + Math.random() * 0.6;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.angle = Math.random() * Math.PI * 2;
    this.angularSpeed = Math.random() * 0.02 - 0.01;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 2, 0, this.size);
    ctx.bezierCurveTo(this.size, this.size / 2, this.size / 2, -this.size / 2, 0, 0);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.angle += this.angularSpeed;
    if (this.y > canvas.height + this.size) this.reset();
    this.draw();
  }
}

function iniciarPetalas() {
  if (petals.length === 0) {
    for (let i = 0; i < 60; i++) {
      petals.push(new Petal());
    }
    animate();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(petal => petal.update());
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});