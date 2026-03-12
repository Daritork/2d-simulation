"use strict";

//*sliders
let angleSelectionSlider;

//* Objects
let m1, counter, pt, SimulationPlate;
let particles = [];

//*vars
let totaltime = 0;

//*buttons
let playB, restartB, magnetOn, magnetFieldDirection;

function setup() {
  //? setUp: create Canva, Text align to middle, agnle mode to degree and shapes creation to center
  createCanvas(window.innerWidth, (9 * window.innerWidth) / 16);

  //*Plate
  SimulationPlate = new Plate();

  //*Sliders
  angleSelectionSlider = createSlider(-45, 45, 0, 15);
  angleSelectionSlider.position(24.2 * multiplier, 9.3 * multiplier);
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
  playB = createButton("starten", "paused");
  playB.mousePressed(playButtonPressed);
  playB.style("font-size", 0.35 * multiplier + "px");
  playB.size(1.8 * multiplier, 0.7 * multiplier);
  // playB.addClass("playButton");
  playB.position(22 * multiplier, 8.2 * multiplier);

  restartB = createButton("Zeit zurücksetzen");
  restartB.mousePressed(reset);
  restartB.style("font-size", 0.35 * multiplier + "px");
  restartB.size(3.5 * multiplier, 0.7 * multiplier);
  restartB.position(24 * multiplier, 8.2 * multiplier);

  magnetOn = createCheckbox();
  magnetOn.position(23.6 * multiplier, 11.45 * multiplier);

  // Create a radio button element and place it
  // in the top-left corner.
  magnetFieldDirection = createRadio();
  magnetFieldDirection.position(25.6 * multiplier, 12.1 * multiplier);
  magnetFieldDirection.size(2 * multiplier);

  // Add a few color options.
  magnetFieldDirection.option("inside", "●");
  magnetFieldDirection.option("outside", "✖");

  // Choose a default option.
  magnetFieldDirection.selected("inside");
  magnetFieldDirection.hide();
}

function playButtonPressed() {
  playB.value(playB.value() == "paused" ? "playing" : "paused");

  if (playB.value() == "paused") {
    for (let i = 0; i < experiments.length; i++) {
      if (i * 15 - 45 == angleSelectionSlider.value()) {
        experiments[i].time = totaltime;
      }
    }
    playB.html("starten");
    console.log(experiments);
    particles = [];
    showAll();
  } else {
    playB.html("stoppen");
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
    totaltime = 0;
  }
}
