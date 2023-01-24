let c;
let particles = [];
let mouseVector;
let colors = ["#ffffff"];
let img;

// Einstellungen für Mausbeeinflussung
const THICKNESS = Math.pow(130, 1.45);
const EASE = 0.25;
const DRAG = 1.45;
const BGCOLOR = ["#ff7000"];
// Blau #044ff4 Orange #ff7000 Beige #ffd8bc Grau #b3b3b3

function preload() {
  fontRegular = loadFont("SpaceMono-Regular.ttf");
}

function setup() {
  img = loadImage("ct.png");
  c = createCanvas(1480, 850);
  // Elemente auf der Zeichenfläche
  background(BGCOLOR);

  fill(colors);
  rect(290, 90, 700, 360);

  // Canvas in Partikel umwandeln
  rasterize();

  noCursor();
}

function draw() {
  // Partikelanimation
  background(BGCOLOR);
  background(img, 1080, 608);
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
    /* text(
      "Zum ersten Mal erleben wir, dass eine einzelne Art für das Aussterben extrem vieler anderer Arten verantwortlich ist.",
      655,
      height / 6.5
    ); */
  }
}

function rasterize() {
  let spacing = 40;
  let tilesX = 125;
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
    translate(this.x - 525, this.y - 100);
    noStroke();
    fill(this.color);
    textSize(25);
    // textFont(fontRegular);
    // circle(0, 0, this.r);
    text("biodiversity", this.x, this.y);

    pop();
  }
}
