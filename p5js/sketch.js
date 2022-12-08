let c;
let particles = [];
let mouseVector;
let colors = ["#ffffff"];
let img;

// Einstellungen für Mausbeeinflussung
const THICKNESS = Math.pow(90, 1.6);
const EASE = 0.25;
const DRAG = 1.85;
const BGCOLOR = 0;

function setup() {
  c = createCanvas(1920, 1000);

  // Elemente auf der Zeichenfläche
  background(BGCOLOR);

  fill(colors);
  rect(160, 260, 600, 500);

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

    if (d + 400 < THICKNESS) {
      t = Math.atan2(dy, dx);
      particle.vx += f * Math.cos(t);
      particle.vy += f * Math.sin(t);
    }

    particle.draw();

    textSize(20);
    fill("red");
    textAlign(CENTER);
    //textFont("Helvetica");
    text(
      "Zum ersten Mal erleben wir, dass eine einzelne Art für das Aussterben extrem vieler anderer Arten verantwortlich ist.",
      655,
      height / 4.5
    );
  }
}

function rasterize() {
  let spacing = 5;
  let tilesX = 120;
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
    textSize(20);
    // circle(0, 0, this.r);
    text("Arten", this.x - 220, this.y - 250);
    pop();
  }
}
