# Findr

A daily hide-and-seek game played on a real map of Bethpage, NY. Someone from
Hawkins is hiding within walking distance of the water tower. You get clues, you
drop a pin, and the map tells you how far off you were.

## Playing

Open `index.html` in a browser. That's the whole thing — Leaflet is inlined, so
the only network it needs is OpenStreetMap map tiles.

Every hunt starts from the same fixed point: **Bethpage, NY** (40.7440,
-73.4818). The date decides who is hiding, which direction, and how far — so
everyone gets the same puzzle and scores are directly comparable, with no server
and no accounts.

- **Clue 1** — who you're chasing, and how they think
- **Clue 2** — the compass sector
- **Clue 3** — a 250 m distance band
- **Clue 4** — the exact bearing

A clue unlocks with each wrong guess. Get within **100 m** and you've found
them. Progress is kept in `localStorage`, so a reload won't restart the day.

## Who hides

Eleven, Dustin, Max, Will, Steve and Vecna — plus Ayan and Deepak Smithy, who
are not from Hawkins but hide just as well.

**Vecna costs you a guess.** On the days he's the quarry you get four instead of
five, and the panel warns you up front.

## The Upside Down

Roughly one day in three the gate is open. When it is:

- The map inverts into cold reds, spores drift up through a blood haze, and the
  sign over the door reads **ЯDNIF**.
- **Every clue reading comes back mirrored.** Clue 2 says north-east, so look
  south-west. Clue 4 says 33°, so walk 213°. The banner tells you this — the map
  is wrong, not the game.
- Your own guesses still read true. The distance and the arrow after each guess
  are honest; only the clues are reversed.
- The reveal opens a gate (🌀) instead of showing the character, and the shared
  result is stamped 🙃 rather than 🔦.

The mirroring is the puzzle. It's cheap to implement and it makes the clue
ladder mean something — clue 4 goes from "walk this way" to a thing you have to
flip in your head before you trust it.

## Proximity lights

After each guess, eight bulbs along the top of the panel light up like the wall
in the Byers' living room — one bulb at 2 km out, all eight when you're inside
100 m. It's the same distance number as the guess row, read at a glance.

## Building

`index.html` is generated — edit `src/index.template.html`, not the built file.

```sh
npm install
node build.js
```

`build.js` inlines Leaflet's CSS and JS into the template. The game deliberately
uses no default Leaflet marker icons, so no image assets are needed either.

## Prototype notes

- The puzzle is computed client-side, so the answer is visible to anyone who
  reads the source. Fine for a solo daily; it would need a server to be
  competitive.
- The hiding spot is placed by bearing-and-distance offset alone, so it can land
  in Bethpage State Park, on the Southern State, or in somebody's pool. Snapping
  to walkable public places needs a road/POI lookup (OSM's Overpass API would
  do it).
- Clues are geometric. Clues drawn from what's actually at the location — "he's
  near the LIRR station", "look for the tallest thing on the block" — would make
  it a real hunt.
- Fan-made, for personal use. The Stranger Things characters belong to their
  owners; nothing here is copied from the show beyond names and traits.
