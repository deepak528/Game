# Gate Runner

A single-file 3D arena game. Open `index.html` in any modern browser — there is
no build step and nothing to install. Three.js loads from a CDN.

## Playing

- **W A S D** or the arrow keys to move, relative to where the camera is looking
- **Space** to jump — there is a little coyote time, so a jump still works for a
  moment after you run off an edge
- **Click** to fire (or **F**). Clicking once grabs the mouse for looking around;
  **Esc** releases it
- **Shift** to boost

Collect the glowing cores. Every fourth one raises the wave: more drones, faster,
and a little shield back. Drones chase you and cost shield on contact; shooting
one is worth 25, a core is worth 60. At zero shield the run ends.

## How it works

- **Physics** is a sphere against axis-aligned boxes. For each platform the
  closest point on the box is found, and if it is inside the player's radius the
  player is pushed out along that normal with the inward velocity cancelled —
  which slides along walls rather than sticking, and reports a floor contact when
  the normal points up.
- **The camera** is a third-person chase rig. It raycasts toward its own goal and
  climbs over anything in the way rather than pushing through it, and fades the
  player out if it still ends up close.
- **Lighting** is deliberately only three lights — a shadow-casting moon, the
  player's glow, and one reused muzzle flash. Everything else glows by emissive
  material, because a light per drone and per core would sail past the uniform
  limit within a couple of waves.
- `?debug` exposes `window.arenaDebug()` with position, velocity, counts and
  scene totals.
