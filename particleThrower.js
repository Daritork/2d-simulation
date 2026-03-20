"use strict";

class particleThrower {
  constructor() {
    this.radioaktiveStickInside = true;
  }

  show() {
    let currentStick = selectStick.value();
    let randomPercent = Math.random();

    fill("#414141");
    rect(-4 * multiplier, 0, 3 * multiplier, 1 * multiplier);

    if (this.radioaktiveStickInside) {
      fill("#292997");
      rect(-5 * multiplier, 0, 5.5 * multiplier, 0.7 * multiplier, 5);
      //? generate a particle with a percent chance
      if (
        playB.value() == "playing" &&
        randomPercent <
        radioactiveSticks[currentStick].activity / simulationSlower
      ) {
        this.generateParticle();
      }

      fill("white");
      textSize(0.3 * multiplier);
      text(
        radioactiveSticks[currentStick].name,
        -6.5 * multiplier,
        0,
        5.5 * multiplier,
      );
      fill(customBlack);
    }

    //*holders
    fill(customBlack);
    for (let i = 0; i < 2; i++) {
      rect(
        -4 * multiplier,
        (1 - 2 * i) * 0.42 * multiplier,
        3 * multiplier,
        0.3 * multiplier,
        i * 15 + 5,
        i * 15 + 5,
        (1 - i) * 15 + 5,
        (1 - i) * 15 + 5,
      );
    }
  }

  generateParticle() {
    let currentStick = radioactiveSticks[selectStick.value()];

    //? generates angle between -10° and 10° in gausian distribution
    let startAngle = randomGaussian(0, 16);

    let speedMultipier;
    if (currentStick.particles.name == "alpha") {
      speedMultipier = Math.random() * 0.05 + 0.1;
    } else if (currentStick.particles.name == "beta") {
      speedMultipier = randomGaussian(0.9, 0.01);
    } else if (currentStick.particles.name == "gamma") {
      speedMultipier = 1;
    }

    addParticle({
      type: currentStick.particles,
      startAngle: startAngle,
      speedMultipier: speedMultipier,
    });
  }
}
