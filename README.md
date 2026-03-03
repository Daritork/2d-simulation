# 2d-simulation

angle relation of the radioaktive particles inside of the magnet field

## Overview

This project simulates the behavior of radioactive particles (alpha, beta, and gamma radiation) as they pass through a magnetic field. It visualizes how different particle types are deflected at various angles, demonstrating the principles of charged particle motion in magnetic fields.

## Features

- **Particle Simulation**: Generates alpha, beta⁻, beta⁺, and gamma particles with realistic physical properties
- **Magnetic Field Deflection**: Uses the Lorentz force to calculate particle trajectories
- **Interactive Visualization**:
  - Real-time particle tracking on a 2D plate
  - Geiger-Müller counter for particle detection
  - Magnetic field strength display
- **Physics Accuracy**: Implements leapfrog integration for precise trajectory calculations

## Technical Details

- Built with **p5.js** for rendering
- Physics calculations using **vector mathematics**
- Particle parameters based on standard physics constants
- Time step: 1×10⁻¹² seconds for numerical stability
