let c;
let particles = [];
let mouseVector;
let colors = ["#ffffff"];

// Einstellungen für Mausbeeinflussung
const THICKNESS = Math.pow(50, 2);
const EASE = 0.25;
const DRAG = 0.95;
const BGCOLOR = 0;

function setup() {
  c = createCanvas(800, 800);

  // Elemente auf der Zeichenfläche
  background(BGCOLOR);

  fill(colors);
  rect(200, 460, 400, 200);

  // Canvas in Partikel umwandeln
  rasterize();
}

function draw() {
  // Partikelanimation
  background(BGCOLOR);

  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];

    let d = (dx = mouseX - particle.x) * dx + (dy = mouseY - particle.y) * dy;
    let f = -THICKNESS / d;

    if (d < THICKNESS) {
      t = Math.atan2(dy, dx);
      particle.vx += f * Math.cos(t);
      particle.vy += f * Math.sin(t);
    }

    particle.draw();

    textSize(20);
    fill(255);
    textAlign(CENTER);
    text("250+ Beschäftigte", 280, height / 2);
  }
}

function rasterize() {
  let spacing = 4;
  let tilesX = 50;
  let tilesY = tilesX;

  let tileWidth = width / tilesX - spacing;
  let tileHeight = height / tilesY - spacing;

  let bg = color(BGCOLOR);

  for (let x = 0; x < tilesX; x++) {
    for (let y = 0; y < tilesY; y++) {
      let px = floor(x * (tileWidth + spacing));
      let py = floor(y * (tileHeight + spacing));

      let pixelColor = color(c.get(px, py));

      // für bessere Leistung: nur wirklich benutzte Pixel als Partikel erstellen
      if (pixelColor.toString() != bg.toString()) {
        let particle = new Particle(px, py, tileWidth, pixelColor);
        particles.push(particle);
      }
    }
  }
}

class Particle {
  constructor(x, y, r, color) {
    // Aktuelle Position
    this.x = x;
    this.y = y;

    // Ursprüngliche Position
    this.ox = x;
    this.oy = y;

    // Geschwindigkeit
    this.vx = 0;
    this.vy = 0;

    // Styling
    this.r = r;
    this.color = color;
  }

  draw() {
    // Geschwindigkeit auf Position anwenden
    this.x += (this.vx *= DRAG) + (this.ox - this.x) * EASE;
    this.y += (this.vy *= DRAG) + (this.oy - this.y) * EASE;

    push();
    translate(this.x, this.y);
    noStroke();
    fill(this.color);
    circle(0, 0, this.r);
    pop();
  }
}
