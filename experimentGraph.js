"use strict";

let rateValues = [];
let maxRateValue = 0;

function updateEventCount() {
  currentExperiment.events++;
}

function results() {
  const start = createVector(4 * multiplier, 25 * multiplier);
  const height = 8 * multiplier;
  const width = 17 * multiplier;
  const colors = ["yellow", "blue", "red"];

  coordinateSystem({
    start: start,
    height: height,
    width: width,
    colors: colors,
  });
  graphic({ start: start, height: height, width: width, colors: colors });
}

function coordinateSystem({ start, height, width, colors }) {
  //? y-Axis
  textSize(0.4 * multiplier);
  drawArrow(start, createVector(0, -height - 0.4 * multiplier), "black");
  text("Rate in [1/s]", start.x, start.y - height - 0.8 * multiplier);

  //? x-Axis
  drawArrow(start, createVector(width + 0.2 * multiplier, 0), "black");
  text(
    "Winkel in [°]",
    start.x + (width + 0.2 * multiplier) / 2,
    start.y + 0.95 * multiplier,
  );

  //? legend
  textAlign(LEFT, CENTER);
  fill(colors[0]);
  rect(
    start.x + width + 1.5 * multiplier,
    start.y - height / 2 - 1 * multiplier,
    0.5 * multiplier,
  );
  fill(customBlack);
  text(
    "mit Magnetfeld: ✖",
    start.x + width + 2 * multiplier,
    start.y - height / 2 - 1 * multiplier,
  );

  fill(colors[1]);
  rect(
    start.x + width + 1.5 * multiplier,
    start.y - height / 2,
    0.5 * multiplier,
  );
  fill(customBlack);
  text(
    "mit Magnetfeld: ●",
    start.x + width + 2 * multiplier,
    start.y - height / 2,
  );

  fill(colors[2]);
  rect(
    start.x + width + 1.5 * multiplier,
    start.y - height / 2 + 1 * multiplier,
    0.5 * multiplier,
  );
  fill(customBlack);
  text(
    "ohne Magnetfeld",
    start.x + width + 2 * multiplier,
    start.y - height / 2 + 1 * multiplier,
  );
  textAlign(CENTER, CENTER);

  if (maxRateValue) {
    textAlign(RIGHT, CENTER);
    line(
      start.x - 0.1 * multiplier,
      start.y - height,
      start.x + 0.1 * multiplier,
      start.y - height,
    );
    text(maxRateValue.toFixed(4), start.x - 0.2 * multiplier, start.y - height);
    textAlign(CENTER, CENTER);
  }
}

function graphic({ start, height, width, colors }) {
  push();
  rectMode(CORNER);
  textSize(0.4 * multiplier);
  strokeWeight(0.05 * multiplier);

  for (let i = 0; i < rateValues.length; i++) {
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
      start.x + i * 3 * barWidth + 1.6 * barWidth,
      start.y + 0.4 * multiplier,
    );

    push();
    strokeWeight(0.1 * multiplier);
    drawingContext.setLineDash([10, 20]);
    line(
      startX + 3 * barWidth,
      start.y + 0.1 * multiplier,
      startX + 3 * barWidth,
      start.y - 1 * height,
    );
    pop();
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
