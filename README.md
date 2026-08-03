# Findr

A daily hide-and-seek game played on a real map of wherever you happen to be standing.

Each day one character goes into hiding. You get clues, you drop a pin where you
think they are, and the game tells you how far off you were and which way to go.
Five guesses.

## The daily twist

The date seeds the **character, the bearing, and the distance** — not an absolute
coordinate. The hiding spot is that offset applied to *your* location.

So everyone in the world hunts the same character, at the same distance and
compass bearing, from their own doorstep. Scores are directly comparable and it
needs no server, no accounts, and no database.

## Playing

Open `index.html` in a browser. That's the whole thing — Leaflet is inlined, so
the only network it needs is OpenStreetMap map tiles.

Allow location access to play on your own streets, or use the fallback start
point — Bethpage, NY town centre.

To start from an exact spot instead, load the page once with coordinates:

```
index.html?at=40.7512,-73.4795
```

They're saved in that browser's `localStorage` and reused on later visits, so a
precise home location never has to be committed to the repo. Grab the numbers by
right-clicking the spot in Google Maps and copying the lat/lng it offers.

- **Clue 1** — a character hint, available immediately
- **Clue 2** — the compass sector they're in
- **Clue 3** — a 250 m distance band
- **Clue 4** — their exact bearing

A clue unlocks with each wrong guess. Get within **100 m** and you've found them.
Progress is kept in `localStorage`, so a reload won't restart the day.

## Building

`index.html` is generated — edit `src/index.template.html`, not the built file.

```sh
npm install
node build.js
```

`build.js` inlines Leaflet's CSS and JS into the template. The game deliberately
uses no default Leaflet marker icons, so no image assets are needed either.

## Prototype notes

This is a mechanic prototype. Known limitations:

- The puzzle is computed client-side, so the answer is visible to anyone who
  reads the source. Fine for a solo daily; it would need a server to be
  competitive.
- Clues are geometric (bearing and distance). Clues drawn from what's actually
  at the location — "she's near a bridge", "look for the tallest building" —
  would need reverse geocoding and would be a real step up.
- The hiding spot is placed by offset alone, so it can land in water or on a
  freeway. Snapping to walkable places is the obvious next fix.
