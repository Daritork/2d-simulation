"use strict";

/*
  cords: {x: number, y: number};
  width: number; //? in cm
  height: number; //? in cm
  magnetOn: boolean; //? with(-out) magnet
*/

class Plate {
  constructor() {
    this.width = 17;
    this.height = 13;
    this.cords = { x: 12.5 * multiplier, y: height / 2 };
  }

  show() {
    let plateStartX = this.cords.x - (this.width / 2) * multiplier;
    strokeWeight(2);
    fill("#a09779");
    rect(
      this.cords.x,
      8 * multiplier,
      this.width * multiplier,
      this.height * multiplier,
    );

    fill(customBlack);
    strokeWeight(0);

    //* decorations
    translate(plateStartX + 4 * multiplier, 8 * multiplier);
    stroke("black");
    strokeWeight(0.08 * multiplier);
    textSize(0.4 * multiplier);

    //* radius arcs
    for (let r = 1; r <= 7; r++) {
      this.radiusArc(r);
    }

    //* angle lines
    this.anglelines();
  }

  anglelines() {
    point(0, 0);
    for (let a = -45; a <= 45; a += 15) {
      strokeWeight(0.05 * multiplier);
      let endLineCords = [7 * multiplier * cos(a), 7 * multiplier * sin(a)];
      line(0, 0, endLineCords[0], endLineCords[1]);

      circle(endLineCords[0], endLineCords[1], 0.6 * multiplier);

      strokeWeight(0);
      text(a + "°", 7.9 * multiplier * cos(a), 7.9 * multiplier * sin(a));
    }
  }

  radiusArc(r) {
    strokeWeight(0.05 * multiplier);
    noFill();
    if (r == 5) {
      strokeWeight(0.08 * multiplier);
    }

    arc(0, 0, r * 2 * multiplier, r * 2 * multiplier, -51, 51);

    strokeWeight(0);
    fill("black");
    text(r, (r - 0.5) * multiplier * cos(51), (r + 0.2) * multiplier * sin(51));
  }
}
