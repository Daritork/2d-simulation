class GeigerMüllerCounter {
  constructor() {}

  show(angle) {
    push();
    //? translate to the counter to it`s beginning to rotate it in the direction of the angle
    translate(5 * multiplier * cos(angle), 5 * multiplier * sin(angle));
    rotate(angle);

    //? Geiger Müller Counter body
    //*body

    strokeWeight(0.05 * multiplier);

    fill("#964722");
    rect(0.45 * multiplier, 0, 0.8 * multiplier, 1.2 * multiplier);
    fill("#414141");
    rect(3.5 * multiplier, 0, 5.6 * multiplier, 1.8 * multiplier);
    //? theory: color as a touch marker
    strokeWeight(2);
    stroke("#5a220a");
    line(
      0.1 * multiplier,
      -0.55 * multiplier,
      0.1 * multiplier,
      0.55 * multiplier,
    );

    stroke("black");
    strokeWeight(0.05 * multiplier);

    //* warning sign
    fill("yellow");
    triangle(
      1 * multiplier,
      0,
      2 * multiplier,
      -0.5 * multiplier,
      2 * multiplier,
      0.5 * multiplier,
    );
    fill(customBlack);
    rotate(-90);
    textSize(0.7 * multiplier);
    strokeWeight(0);
    text("!", 0, 1.65 * multiplier);
    strokeWeight(0.05 * multiplier);
    textSize(0.4 * multiplier);
    rotate(90);

    strokeWeight(1);

    //*counter holders
    fill(customBlack);
    for (let i = 0; i < 2; i++) {
      rect(
        2 * multiplier,
        (1 - 2 * i) * 1 * multiplier,
        2 * multiplier,
        0.3 * multiplier,
        i * 15 + 5,
        i * 15 + 5,
        (1 - i) * 15 + 5,
        (1 - i) * 15 + 5,
      );
    }

    rotate(-angle);
    //? pop() cancels the translation effect
    pop();
  }
}
