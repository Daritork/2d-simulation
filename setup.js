"use strict";

//*sliders
let angleSelectionSlider;

//* Objects
let m1, counter, pt, SimulationPlate;
let particles = [];

//*buttons
let playB, restartB, magnetOn, magnetFieldDirection;

function setup() {
  //? setUp: create Canva, Text align to middle, agnle mode to degree and shapes creation to center
  createCanvas(window.innerWidth, (9 * window.innerWidth) / 16);

  //*Plate
  SimulationPlate = new Plate();

  //*Sliders
  angleSelectionSlider = createSlider(-45, 45, 0, 15);
  angleSelectionSlider.position(23.5 * multiplier, 11.8 * multiplier);
  angleSelectionSlider.size(3 * multiplier, 0.5 * multiplier);

  //* Magnet
  m1 = new magnet({
    power: magnetPower,
  });

  //*counter
  counter = new GeigerMüllerCounter();

  //*
  pt = new particleThrower();

  //*buttons
  playB = createButton("▶︎", "paused");
  playB.mousePressed(playButtonPressed);
  playB.style("font-size", 0.35 * multiplier + "px");
  playB.size(1.8 * multiplier, 0.7 * multiplier);
  playB.position(22 * multiplier, 10.7 * multiplier);

  restartB = createButton("Messung speichern");
  restartB.mousePressed(reset);
  restartB.style("font-size", 0.35 * multiplier + "px");
  restartB.size(3.5 * multiplier, 0.7 * multiplier);
  restartB.position(24 * multiplier, 10.7 * multiplier);

  magnetOn = createCheckbox();
  magnetOn.position(23.6 * multiplier, 13.25 * multiplier);
  magnetOn.style("width", 0.5 * multiplier + "px");

  // Create a radio button element and place it
  // in the top-left corner.
  magnetFieldDirection = createRadio();
  magnetFieldDirection.mousePressed(changeMagnetDirection);
  magnetFieldDirection.position(25.6 * multiplier, 13.9 * multiplier);
  magnetFieldDirection.size(2.5 * multiplier);

  // Add a few color options.
  magnetFieldDirection.option("outside", "●");
  magnetFieldDirection.option("inside", "✖");

  // Choose a default option.
  magnetFieldDirection.selected("outside");
  magnetFieldDirection.hide();
}

function changeMagnetDirection() {
  if (magnetFieldDirection.value() == "outside") {
    m1 = new magnet({
      power: -magnetPower,
    });
  } else {
    m1 = new magnet({
      power: magnetPower,
    });
  }
}

function playButtonPressed() {
  playB.value(playB.value() == "paused" ? "playing" : "paused");

  if (playB.value() == "paused") {
    playB.html("▶︎");
    particles = [];
    showAll();
  } else {
    currentExperiment.time = 0;
    currentExperiment.events = 0;
    playB.html("❚❚");
    hideAll();
  }
}

function hideAll() {
  angleSelectionSlider.hide();
  magnetOn.hide();
  magnetFieldDirection.hide();
  restartB.hide();
}

function showAll() {
  angleSelectionSlider.show();
  magnetOn.show();
  magnetFieldDirection.show();
  restartB.show();
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
  if (playB.value() == "paused") {
    currentExperiment.time = 0;
  }
}
