function currentSetting() {
  const start = { x: 22 * multiplier, y: 7.2 * multiplier };

  textSize(0.6 * multiplier);
  text("Aktuelle Messung", start.x, start.y);

  line(
    start.x,
    start.y + 1.3 * multiplier,
    start.x + 6.6 * multiplier,
    start.y + 1.3 * multiplier,
  );

  textAlign(CENTER, CENTER);
  textSize(0.4 * multiplier);

  text("α", start.x + 0.5 * multiplier, start.y + 0.9 * multiplier);
  text(
    angleSelectionSlider.value(),
    start.x + 0.5 * multiplier,
    start.y + 1.7 * multiplier,
  );

  line(
    start.x + 1 * multiplier,
    start.y + 0.6 * multiplier,
    start.x + 1 * multiplier,
    start.y + 2 * multiplier,
  );

  text("Δt", start.x + 2 * multiplier, start.y + 0.9 * multiplier);
  text(
    currentExperiment.time / 1e12,
    start.x + 2 * multiplier,
    start.y + 1.7 * multiplier,
  );

  line(
    start.x + 3 * multiplier,
    start.y + 0.6 * multiplier,
    start.x + 3 * multiplier,
    start.y + 2 * multiplier,
  );

  text("N", start.x + 3.8 * multiplier, start.y + 0.9 * multiplier);
  text(
    currentExperiment.events,
    start.x + 3.8 * multiplier,
    start.y + 1.7 * multiplier,
  );

  line(
    start.x + 4.6 * multiplier,
    start.y + 0.6 * multiplier,
    start.x + 4.6 * multiplier,
    start.y + 2 * multiplier,
  );

  text("Magnet", start.x + 5.6 * multiplier, start.y + 0.9 * multiplier);
  text(
    magnetOn.checked() ? m1.power.z + " T" : "⸺",
    start.x + 5.6 * multiplier,
    start.y + 1.7 * multiplier,
  );

  textAlign(LEFT, CENTER);
}

function simulationSettings() {
  const start = { x: 22 * multiplier, y: 10 * multiplier };

  textSize(0.8 * multiplier);
  text("Einstellungen", start.x, start.y);

  if (playB.value() == "paused" && particles.length === 0) {
    textSize(0.4 * multiplier);
    text("Winkel: ", start.x, start.y + 3 * 0.7 * multiplier);
    //TODO: influence on a simulation
    text("Teilchenart: ", start.x, start.y + 4 * 0.7 * multiplier);
    text("Magnet:", start.x, start.y + 5 * 0.7 * multiplier);
    if (magnetOn.checked()) {
      text("Magnetfeldrichtung: ", start.x, start.y + 6 * 0.7 * multiplier);
      magnetFieldDirection.show();
    } else {
      magnetFieldDirection.hide();
    }
  }
}
