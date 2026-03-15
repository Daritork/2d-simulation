"use strict";
function rateValue(start) {
  push();
  rectMode(CORNER);
  strokeWeight(0.05 * multiplier);
  for (let i = 0; i < experiments.length; i++) {
    let startX = start.x + 0.2 * multiplier + i * 1.1 * multiplier;
    let height =
      ((experiments[i][1].events / experiments[i][1].time) * multiplier) / 10;

    fill("red");
    rect(startX, start.y, 0.7 * multiplier, -height);
    fill(customBlack);
    text(
      experiments[i][0] + "°",
      startX + 0.4 * multiplier,
      start.y + 0.35 * multiplier,
    );
  }
  pop();
}

function updateEventCount() {
  currentExperiment.events++;
}

function results() {
  //TODO: automatiic scaling
  const start = createVector(22 * multiplier, 6 * multiplier);
  const height = 4 * multiplier;
  const width = 8 * multiplier;

  coordinateSystem(start);
  // rateValue(start);
}

function coordinateSystem(start) {
  //? y-Axis
  drawArrow(start, createVector(0, -4 * multiplier), "black");
  //? x-Axis
  drawArrow(start, createVector(8 * multiplier, 0), "black");
}

function updateTime() {}
