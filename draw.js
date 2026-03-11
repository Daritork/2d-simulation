"use strict";
function draw() {
  const angleValue = angleSelectionSlider.value();

  //? can`t change the angle during an ongoing simulation
  if (playB.value() == "0" && particles.length === 0) {
    angleSelectionSlider.show();
  } else {
    angleSelectionSlider.hide();
  }

  //? World
  background(160);

  simulationSettings();

  push();

  SimulationPlate.show();

  stroke("black");
  strokeWeight(0.08 * multiplier);
  textSize(0.4 * multiplier);

  counter.show(angleValue);

  particleControl(angleValue);

  if (magnetOn) {
    m1.show();
  }

  pt.show();

  pop();

  //* results

  strokeWeight(0.1 * multiplier);
  line(0, 17 * multiplier, width, 17 * multiplier);
}

function simulationSettings() {
  textSize(0.8 * multiplier);
  text("Einstellungen", 26 * multiplier, 2.5 * multiplier);
}

function particleControl() {
  const angleValue = angleSelectionSlider.value();
  //? shows all current partiles on the field and checks if they are in the simulation area
  if (particles.length) {
    for (let i = 0; i < particles.length; i++) {
      const x = particles[i].position.x;
      const y = particles[i].position.y;
      particles[i].show();

      if (dist(x, y, 0, 0) >= 9 * multiplier) {
        particles.splice(i, 1);
      }

      if (
        dist(x, 0, 5 * multiplier * cos(angleValue), 0) <= 0.3 * multiplier &&
        dist(0, y, 0, 5 * multiplier * sin(angleValue)) <= 0.6 * multiplier
      ) {
        particles.splice(i, 1);
      }
    }
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
