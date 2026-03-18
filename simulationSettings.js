function currentSetting() {
  const start = { x: 22 * multiplier, y: 3 * multiplier };

  textSize(0.6 * multiplier);
  text("Aktuelle Messung", start.x, start.y);

  line(
    start.x + 1.9 * multiplier,
    start.y + 0.6 * multiplier,
    start.x + 1.9 * multiplier,
    start.y + 3.6 * multiplier,
  );

  textAlign(CENTER, CENTER);
  textSize(0.4 * multiplier);

  text("α", start.x + 0.9 * multiplier, start.y + 0.9 * multiplier);
  textAlign(LEFT, CENTER);
  text(
    -angleSelectionSlider.value() + "°",
    start.x + 2.2 * multiplier,
    start.y + 0.9 * multiplier,
  );

  line(
    start.x,
    start.y + 1.3 * multiplier,
    start.x + 6.6 * multiplier,
    start.y + 1.3 * multiplier,
  );

  textAlign(CENTER, CENTER);
  text("Δt", start.x + 0.9 * multiplier, start.y + 1.7 * multiplier);
  textAlign(LEFT, CENTER);
  text(
    (currentExperiment.time / simulationSlower).toFixed(3) + " s",
    start.x + 2.2 * multiplier,
    start.y + 1.7 * multiplier,
  );

  line(
    start.x,
    start.y + 2.1 * multiplier,
    start.x + 6.6 * multiplier,
    start.y + 2.1 * multiplier,
  );

  textAlign(CENTER, CENTER);
  text("N", start.x + 0.9 * multiplier, start.y + 2.5 * multiplier);
  textAlign(LEFT, CENTER);
  text(
    currentExperiment.events,
    start.x + 2.2 * multiplier,
    start.y + 2.5 * multiplier,
  );

  line(
    start.x,
    start.y + 2.9 * multiplier,
    start.x + 6.6 * multiplier,
    start.y + 2.9 * multiplier,
  );

  textAlign(CENTER, CENTER);
  text("Magnet", start.x + 0.9 * multiplier, start.y + 3.3 * multiplier);
  textAlign(LEFT, CENTER);
  text(
    magnetOn.checked() ? m1.power.z + " T" : "⸺",
    start.x + 2.2 * multiplier,
    start.y + 3.3 * multiplier,
  );

  textAlign(LEFT, CENTER);
}

function simulationSettings() {
  const start = { x: 22 * multiplier, y: 8 * multiplier };

  textSize(0.8 * multiplier);
  text("Einstellungen", start.x, start.y);

  if (playB.value() == "paused" && particles.length === 0) {
    textSize(0.4 * multiplier);
    text("Winkel: ", start.x, start.y + 3 * 0.7 * multiplier);
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
