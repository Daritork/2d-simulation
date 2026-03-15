"use strict";
function draw() {
  const angleValue = angleSelectionSlider.value();
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  rectMode(CENTER);

  if (playB.value() == "playing") {
    currentExperiment.time += delta_t * 10e11;
  }

  //? World
  background(160);

  textAlign(LEFT, CENTER);
  currentSetting();
  simulationSettings();
  textAlign(CENTER, CENTER);

  push();

  SimulationPlate.show();

  stroke("black");
  strokeWeight(0.08 * multiplier);
  textSize(0.4 * multiplier);

  particleControl(angleValue);

  counter.show(angleValue);

  if (magnetOn.checked()) {
    m1.show();
  }

  // fill("red");
  // rect(
  //   5.1 * multiplier * cos(angleSelectionSlider.value()),
  //   5.1 * multiplier * sin(angleSelectionSlider.value()),
  //   1 * multiplier * sin(-angleSelectionSlider.value()),
  //   1.2 * multiplier * cos(-angleSelectionSlider.value()),
  // );
  // fill(customBlack);

  strokeWeight(0.05 * multiplier);
  pt.show();

  pop();

  //* results
  results();
}
