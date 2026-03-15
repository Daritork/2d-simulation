"use strict";
/*
  cords: [x: number, y: number];
  velocity: number; //? in m/s
  angle: number; //? right = 0, bottom = 90, left = 180, top = -90
  particleMass: number; //? in kg
  change: number; //? in Coulomb
  x: number //? in m
  y: number //? in m
  r: number //? in m
*/

//* a class particle is an upperclass for alpha, beta and gamma particles
class particle {
  constructor({ mass, charge, velocity }) {
    this.position = createVector(-2.2 * multiplier, 0, 0);
    this.velocity = velocity;

    this.mass = mass;
    this.charge = charge;

    //? radius = (m * V) / (q * B)

    // this.r = (this.mass * this.velocity.x) / (this.charge * m1.power);

    //*first acceleration happend only in one direction
    this.acceleration = p5.Vector.mult(
      p5.Vector.cross(this.velocity, m1.power),
      this.charge / this.mass,
    );
  }

  inMagnet() {
    if (
      dist(this.position.x, this.position.y, 2 * multiplier, 0) <
        m1.r * multiplier &&
      magnetOn.checked()
    ) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    strokeWeight(0.3 * multiplier);

    stroke("red");
    if (this.mass == 0) {
      stroke("cyan");
    }

    point(this.position);

    stroke("black");
    strokeWeight(0);

    this.movement();
  }

  movement() {
    if (this.inMagnet() && magnetOn && this.mass != 0) {
      this.leapfrog();
    } else {
      this.position = p5.Vector.add(
        this.position,
        p5.Vector.mult(this.velocity, delta_t),
      );
    }
  }

  leapfrog() {
    //* update velocity: V = V + 0.5 * a * t
    this.velocity = p5.Vector.add(
      this.velocity,
      p5.Vector.mult(this.acceleration, 0.5 * delta_t),
    );

    //* update position: x = x + V * t
    this.position = p5.Vector.add(
      this.position,
      p5.Vector.mult(this.velocity, delta_t),
    );

    //* update acceleration: F_l = F => a = VxB * C / m
    this.acceleration = p5.Vector.mult(
      p5.Vector.cross(this.velocity, m1.power),
      this.charge / this.mass,
    );

    //* update velocity once more: V = V + 0.5 * a * t
    this.velocity = p5.Vector.add(
      this.velocity,
      p5.Vector.mult(this.acceleration, 0.5 * delta_t),
    );
  }
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
        updateEventCount();
        particles.splice(i, 1);
      }
    }
  }
}

function insideTheCounter(x, y) {
  const angleValue = angleSelectionSlider.value();
  if (
    dist(x, 0, 5.1 * multiplier * cos(angleValue), 0) <=
      Math.max(
        Math.abs(0.5 * multiplier * sin(angleValue)),
        0.1 * multiplier,
      ) &&
    dist(0, y, 0, 5.1 * multiplier * sin(angleValue)) <=
      Math.abs(0.6 * multiplier * cos(angleValue)) &&
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
