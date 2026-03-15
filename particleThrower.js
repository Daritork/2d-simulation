"use strict";

class particleThrower {
  constructor() {
    this.radioaktiveStickInside = true;
  }

  show() {
    fill("#414141");
    rect(-4 * multiplier, 0, 3 * multiplier, 1 * multiplier);

    if (this.radioaktiveStickInside) {
      fill("#292997");
      rect(-5 * multiplier, 0, 5.5 * multiplier, 0.7 * multiplier, 5);
      if (playB.value() == "playing") {
        this.generateParticle();
      }
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
    // if (frameCount % 20 == 0 && particles.length < 1) {
    if (frameCount % 20 == 0) {
      // let int = Math.floor(Math.random() * 4);
      let int = 1;

      //? generates angle between -10° and 10° in gausian distribution
      let startAngle = randomGaussian(0, 5);
      // let startAngle = -9;

      //? generates random speed multiplier between 0.7 and 1
      let speedMultipier = Math.random() * 0.3 + 0.7;

      addParticle({
        type: int,
        startAngle: startAngle,
        speedMultipier: speedMultipier,
      });
    }
  }
}
