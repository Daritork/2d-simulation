const particleTypes = [
  //? alpha
  {
    name: "alpha",
    mass: 6.644e-27,
    charge: -3.204e-19,
  },
  //? beta-
  {
    name: "beta",
    mass: 9.109e-31,
    charge: -1.602e-19,
  },
  //? gamma
  {
    name: "gamma",
    mass: 0,
    charge: 0,
  },
];

const radioactiveSticks = [
  {
    name: "Am-241",
    particles: particleTypes[0],
    activity: 10.825,
  },
  {
    name: "Co-60",
    particles: particleTypes[2],
    activity: 46.308,
  },
  {
    name: "Cs-137",
    particles: particleTypes[1],
    activity: 18.625,
  },
  {
    name: "Sr-90",
    particles: particleTypes[1],
    activity: 349.742,
  },
];

const magnetPower = 50e-3;

const multiplier = window.innerWidth / 31;

const customBlack = "#212121";

const delta_t = 3e-12;

const simulationSlower = 500;