"use strict";
function draw() {
  const angleValue = angleSelectionSlider.value();
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  rectMode(CENTER);

  if (playB.value() == "playing") {
    totaltime += delta_t * 10e11;
  }

  //? World
  background(160);

  simulationSettings();

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

  strokeWeight(0.05 * multiplier);
  pt.show();

  pop();

  //* results
  results();

  // strokeWeight(0.1 * multiplier);
  // line(0, 17 * multiplier, width, 17 * multiplier);
}

function results() {
  //TODO: automatiic scaling
  const start = createVector(22 * multiplier, 6 * multiplier);
  const height = 4;
  const width = 8;

  coordinateSystem(start);
  rateValue(start);
}

function coordinateSystem(start) {
  //? y-Axis
  drawArrow(start, createVector(0, -4 * multiplier), "black");
  //? x-Axis
  drawArrow(start, createVector(8 * multiplier, 0), "black");
}

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

function simulationSettings() {
  const start = { x: 22 * multiplier, y: 7.5 * multiplier };

  textAlign(LEFT, CENTER);

  textSize(0.8 * multiplier);
  text("Einstellungen", start.x, start.y);

  textSize(0.4 * multiplier);
  text(
    "Winkel: " + angleSelectionSlider.value() + "°",
    start.x,
    start.y + 3 * 0.7 * multiplier,
  );
  text(
    "Zeit: " + totaltime / 10e11 + " s",
    start.x,
    start.y + 4 * 0.7 * multiplier,
  );

  if (playB.value() == "paused" && particles.length === 0) {
    //TODO: influence on a simulation
    text("Teilchenart: ", start.x, start.y + 5 * 0.7 * multiplier);
    text("Magnet:", start.x, start.y + 6 * 0.7 * multiplier);
    if (magnetOn.checked()) {
      text("Magnetfeldrichtung: ", start.x, start.y + 7 * 0.7 * multiplier);
      magnetFieldDirection.show();
    } else {
      magnetFieldDirection.hide();
    }
  }

  textAlign(CENTER, CENTER);
}

function particleControl() {
  //? shows all current partiles on the field and checks if they are in the simulation area
  if (particles.length) {
    for (let i = 0; i < particles.length; i++) {
      const x = particles[i].position.x;
      const y = particles[i].position.y;
      particles[i].show();

      //? if a particle is outside of a simulation area, delete it
      if (dist(x, y, 0, 0) >= 9 * multiplier) {
        particles.splice(i, 1);
      }

      if (insideTheCounter(x, y)) {
        //TODO: saving process

        console.log(1);
        for (let j = 0; j < experiments.length; j++) {
          console.log(j * 15 - 45);
          if (j * 15 - 45 == angleValue) {
            experiments[j].events++;
          }
        }
        particles.splice(i, 1);
      }
    }
  }
}

function insideTheCounter(x, y) {
  const angleValue = angleSelectionSlider.value();

  if (
    dist(x, 0, 5.1 * multiplier * cos(angleValue), 0) <=
      0.5 * multiplier * sin(angleValue) &&
    dist(0, y, 0, 5.1 * multiplier * sin(angleValue)) <=
      0.6 * multiplier * cos(angleValue) &&
    playB.value() == "playing"
  ) {
    return true;
  } else {
    return false;
  }
}

function addParticle({ speedMultipier, startAngle, type }) {
  const startingVelocity =
    speedMultipier * particleTypes[type].velocity * 100 * multiplier;

  //? generating a new particle
  particles.push(
    new particle({
      mass: particleTypes[type].mass,

      charge: particleTypes[type].charge,

      velocity: createVector(
        startingVelocity * cos(startAngle),

        startingVelocity * sin(startAngle),

        0,
      ),
    }),
  );
}
