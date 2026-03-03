"use strict";

class particleThrower {
  constructor() {
    this.elementInside = true;
    this.particles = [];
  }

  show() {
    fill("#414141");
    rect(-4 * multiplier, 0, 3 * multiplier, 1 * multiplier);

    if (this.elementInside) {
      fill("#292997");
      rect(-5 * multiplier, 0, 5.5 * multiplier, 0.7 * multiplier, 5);
      this.particleTrow();
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

  particleTrow() {
    push();

    translate(-2.15 * multiplier, 0);

    if (frameCount % 60 == 0) {
      let int = Math.floor(Math.random() * 4);

      this.particles.push(
        new particle({
          mass: particles[int].mass,
          charge: particles[int].charge,
          velocity: particles[int].velocity,
        }),
      );
    }

    for (let i = 0; i < this.particles.length; i++) {
      const x = this.particles[i].position.x;
      const y = this.particles[i].position.y;
      this.particles[i].show();

      if (dist(x, y, 0, 0) >= 9.5 * multiplier) {
        this.particles.splice(i, 1);
      }
    }

    pop();
  }
}
