let rect1;
let rect2;
let ground;


function setup() {
  const canvas = createCanvas(1200, 700);

  // create an engine
  let engine = Matter.Engine.create();
  let world = engine.world;

  // add blocks
  const group = Matter.Body.nextGroup(true);
  rect1 = new Block(world,
    { x: 400, y: 200, w: 400, h: 40, color: 'yellow' },
    {collisionFilter: {group: group}, angle: PI/10*4}
  );
  rect2 = new Block(world,
    { x: 400, y: 200, w: 400, h: 40, color: 'yellow' },
    {collisionFilter: {group: group}, angle: PI-PI/10*4}
  );

  // revolute
  rect2.constrainTo(rect1, { length: 2, stiffness: 2 });

  // rubberband
  rect1.constrainTo(rect2, {
    pointA: {x: 5, y: 60},
    pointB: {x: -5, y: 40},
    length: 60,
    stiffness: 0.5
  });

  // ground
  ground = new Block(world, {x:400, y: height, w: 810, h: 100, color: 'blue'}, {isStatic: true});

  // setup mouse
  mouse = new Mouse(engine, canvas);

  // run the engine
  Matter.Runner.run(engine);
}

function draw() {
  background(0);
  ground.draw();
  rect1.draw();
  rect2.draw();
  rect1.drawConstraints();
  rect2.drawConstraints();
  mouse.draw();
}
