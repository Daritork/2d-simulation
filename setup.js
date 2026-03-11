"use strict";

//*Plate
// let particleType;
let SimulationPlate;

//*sliders
let angleSelectionSlider;

//* Objects
let m1, counter, pt;
let particles = [];

//*Objects control vars
let magnetOn = true;

//*buttons
let playB;

function setup() {
  //? setUp: create Canva, Text align to middle, agnle mode to degree and shapes creation to center
  createCanvas(window.innerWidth, (9 * window.innerWidth) / 8);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  rectMode(CENTER);

  //*Plate
  SimulationPlate = new Plate();

  //*Sliders
  angleSelectionSlider = createSlider(-45, 45, 0, 15);
  angleSelectionSlider.position(0, 20);

  //* Magnet
  m1 = new magnet({
    power: magnetPower,
  });

  //*counter
  counter = new GeigerMüllerCounter();

  //*
  pt = new particleThrower();

  //*buttons
  playB = createButton("play", "0");
  playB.mousePressed(playButtonPressed);
  // playB.addClass("playButton");
  playB.position(26 * multiplier, 3 * multiplier);
}

function playButtonPressed() {
  playB.value(playB.value() == "0" ? "1" : "0");

  if (playB.value() == "0") {
    playB.html("play");
  } else {
    playB.html("pause");
  }
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

// function reset() {
//   play = false;
//   changeParticle();
//   playButton.html("play");
// }
