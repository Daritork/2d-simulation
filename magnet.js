"use strict";

/*
  cords: {x: number, y: number};
  power: number; //? in T
  width: number; //? in m (cm)
  height: number; //? in m (cm)
  direction: boolean; //? true -> in the screen; false -> out
*/

class magnet {
  constructor({ power }) {
    this.cordsX = 2;
    this.power = createVector(0, 0, power);
    this.r = 2.5;
    this.direction = true;
  }

  show() {
    strokeWeight(1);
    //   //* south pole
    //   fill("#2c2fe971");

    // //* north pole
    // fill("#e7181871");

    //* magnet layer
    fill(customBlack);
    for (let i = 0; i < 2; i++) {
      rect(
        this.cordsX * multiplier,
        (1 - 2 * i) * 3.7 * multiplier,
        0.8 * multiplier,
        2.5 * multiplier,
        i * 20,
        i * 20,
        (1 - i) * 20,
        (1 - i) * 20,
      );
    }
    fill("#50505089");
    strokeWeight(0.05 * multiplier);
    circle(this.cordsX * multiplier, 0, 2 * this.r * multiplier);
    strokeWeight(1);

    //TODO: show direction •/x
  }
}
