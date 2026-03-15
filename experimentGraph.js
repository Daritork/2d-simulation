"use strict";

let rateValues = [];
let maxRateValue = 0;

function updateEventCount() {
  currentExperiment.events++;
}

function results() {
  const start = createVector(22 * multiplier, 6 * multiplier);
  const height = 4 * multiplier;
  const width = 8 * multiplier;

  coordinateSystem({ start: start, height: height, width: width });
  graphic({ start: start, height: height, width: width });
}

function coordinateSystem({ start, height, width }) {
  //? y-Axis
  drawArrow(start, createVector(0, -height), "black");
  //? x-Axis
  drawArrow(start, createVector(width, 0), "black");
}

function graphic({ start, height, width }) {
  push();
  rectMode(CORNER);
  textSize(0.4 * multiplier);
  strokeWeight(0.05 * multiplier);

  for (let i = 0; i < rateValues.length; i++) {
    let colors = ["red", "blue", "green"];
    let currentAngle = rateValues[i];
    let barWidth = width / 21;
    let startX = start.x + i * 3 * barWidth;

    push();
    stroke(customBlack);
    for (let j = 0; j < currentAngle.length; j++) {
      let currentRate = currentAngle[j];
      let heightMultiplier = currentRate / maxRateValue;

      fill(colors[j]);
      rect(
        startX + j * barWidth,
        start.y,
        barWidth,
        -heightMultiplier * height,
      );
    }
    pop();

    text(
      experiments[i].angle + "°",
      start.x + i * 3 * barWidth + 1.5 * barWidth,
      start.y + 0.4 * multiplier,
    );
  }
}

function rate({ events, time }) {
  return events / time;
}

function rateValuesCollect() {
  rateValues = [];
  for (let i = 0; i < experiments.length; i++) {
    let currentElement = experiments[i].values;
    let height1 = rate({
      events: currentElement.with.inside.events,
      time: currentElement.with.inside.time,
    });
    isNaN(height1) ? (height1 = 0) : height1;
    let height2 = rate({
      events: currentElement.with.outside.events,
      time: currentElement.with.outside.time,
    });
    isNaN(height2) ? (height2 = 0) : height2;
    let height3 = rate({
      events: currentElement.without.events,
      time: currentElement.without.time,
    });
    isNaN(height3) ? (height3 = 0) : height3;
    rateValues.push([height1, height2, height3]);
  }
  maxRateValue = Math.max(...rateValues.flat());
}
