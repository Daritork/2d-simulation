"use strict";

//*Plate
// let particleType;
let SimulationPlate;

//*sliders
let angleSelectionSlider;

//* Objects
let m1, counter, pt;

function setup() {
  //? setUp: create Canva, Text align to middle, agnle mode to degree and shapes creation to center
  createCanvas(window.innerWidth, (9 * window.innerWidth) / 16);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  rectMode(CENTER);

  //*Plate
  SimulationPlate = new Plate();

  //*Sliders
  angleSelectionSlider = createSlider(-45, 45, 0, 15);

  //* Magnet
  m1 = new magnet({
    power: 52e-3,
  });

  //*counter
  counter = new GeigerMüllerCounter();

  //*
  pt = new particleThrower();
}

function playButtonPressed() {
  play = !play;

  if (!play) {
    playButton.html("play");
  } else {
    playButton.html("pause");
  }
}

function changeParticle() {
  play = false;
  createParticle();
}

function createParticle() {
  p1 = new particle({
    start: { x: 150, y: 250 },
    velocity: 2e7,
    angle: 0,
    mass: particles[particleType.selected()].mass,
    charge: particles[particleType.selected()].charge,
  });
}

//? darws an arrow in der direction of the vector
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 5;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function reset() {
  play = false;
  changeParticle();
  playButton.html("play");
}
