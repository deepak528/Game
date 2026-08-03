# Home Before Dinner

A daily hide-and-seek game played on a small fictional town, loosely shaped
after the middle of Bethpage, NY. Someone from Hawkins is hiding at one of
twenty-four places, and they were supposed to be home before dinner. You get
clues, you search a place, and the town tells you how far off you were.

A crooked missing poster at the top of the panel says who you are looking for:
HAVE YOU SEEN, the face, the name.

## Playing

Open `index.html` in a browser. That is the whole game — one file, no build, no
dependencies, no network at all.

The map takes 55% of the screen. The panel below it keeps the guess and New
hunt buttons pinned on one row so they are always in reach, scrolls the clues
above them, and scrolls the newest clue into view each time a miss buys one.

It is built for a phone. A tap counts for the nearest place within 70 map
units, so the targets are finger-sized (about 60px on an iPhone) without any
overlapping circles drawn on the map. Safe-area insets keep the controls clear
of the notch and the home indicator, `dvh` units keep the layout honest while
Safari's toolbar slides in and out, and adding it to the home screen gives it a
name and an icon.

Everything is measured from **The Town**, the green at the centre of the map.
The date decides who is hiding and where, so everyone gets the same puzzle and
scores are directly comparable, with no server and no accounts.

Tap a place to select it, then search it. Five guesses. Each miss reports how
many blocks off you were and which way to go, and unlocks another clue:

- **Clue 1** — who you are chasing, and how they think
- **Clue 2** — the compass sector from The Town
- **Clue 3** — a half-block distance band
- **Clue 4** — why they picked the place they picked

The Town itself is the ruler, not a hiding place, so it can't be searched.

**Pinch the map with two fingers to zoom**, double-tap to zoom toward a spot,
or use the **+ / −** buttons in the corner of the map. Drag to move around;
double-tap again — or press **⤢ Whole town** — to come back out. A mouse wheel
zooms too. A drag that travels is a pan, not a tap, so moving around never
picks a place by accident.

Pinch runs on touch events, not pointer events. `preventDefault` on a
pointermove does not stop Safari running its own page zoom, so a pointer-based
pinch does nothing on an iPhone — the page zooms and the map never sees the
gesture. `preventDefault` on a two-finger `touchmove` does stop it, which is
how map libraries get pinch working on iOS.

**New hunt** starts another round immediately, without waiting for tomorrow. It
always changes both the person and the place, so a reset never looks like it did
nothing. Rounds are seeded off the day (`#1`, `#2`, …) rather than picked at
random, so a hunt survives a reload and stays reproducible. Round 0 is the daily
everyone shares.

## The map

Twenty-five locations, one block = 100 units:

🏛️ The Town · 🍕 Pappardelle's Pizzeria · 📚 Public Library · 🎒 Middle School ·
🏫 High School · 🗼 Water Tower · 🥤 The Grand Diner · 👾 Palace Arcade ·
💈 Lucky Salon · 🚂 Train Station · ⛰️ The Old Bowl · 🏊 Community Pool ·
⚾ Baseball Field · 📻 Sparks Radio · 🪦 Old Grove · 🔧 Smithy's Hardware ·
🌲 The Pines · 🚐 Cherry Lane · 🥯 Stuff a Bagel · ☕ Mongo's Coffee ·
🥂 Campagne House · 📼 Family Video · 🧪 Hawkins Lab · 🛍️ Starcourt Mall ·
🍦 Scoops Ahoy

Palace Arcade, Family Video, Hawkins Lab, Starcourt Mall and Scoops Ahoy are
on loan from Hawkins; the bagels, the salon, the coffee and Campagne House are
pure Bethpage.

The town is drawn like a crayon map: cream paper, every block coloured in with
its own pastel, dashed yellow centrelines down the big streets, a smiling sun in
the corner, and a turbulence filter over the ground so nothing is quite
straight.

Shading is one flat colour per block — nothing is layered on top. Where a
block is a place, the whole block takes its colour: the pines and the ball
fields are green, the pond block is blue.

Streets, blocks and the railway are all drawn from the `STREETS`, `BLOCKS` and
`PLACES` arrays at the top of the script — move a coordinate and the town
redraws. Adding a location means adding one entry
with an `x`, a `y` and a `hint`; the clue system picks it up automatically.

## Who hides

Eleven, Dustin, Max, Will, Steve and Vecna — plus Ayan and Deepak Smithy, who
are not from Hawkins but hide just as well.

**Vecna costs you a guess.** On the days he is the quarry you get four instead
of five, and the panel warns you up front.

## The clock

You go out at **5:00 PM** and an hour passes every thirty seconds, so a whole
evening runs in two minutes.

- **7:30 PM** — the light starts to go, and the vines start coming through.
  The town dims steadily from here and the clock turns red.
- **9:00 PM** — it is fully dark, the vines have taken the town, and whoever is
  still out there is not coming home. The hunt ends whatever guesses you had
  left.

Vines follow the clock rather than your guesses, and on every day, not only
gate days — night is night. The clock stops the moment the hunt ends, and New
hunt puts it back to five o'clock. It runs per round rather than being stored,
so a reload starts the evening over.

## The Upside Down

Roughly one day in three the gate is open. When it is, the town keeps its
daylight crayon colours — the gate shows up as growth, not darkness:

- Spores drift up over the map, the smiling sun goes dark and loses its face,
  and the sign over the door reads backwards. The vines are on the clock now
  (see above), and the reveal opens the gate the rest of the way.
- The panel, clues and buttons never change — only the map crosses over, and
  every place stays exactly as readable as on a normal day.
- **Every clue reading comes back mirrored.** Clue 2 says north-east, so look
  south-west. The banner tells you this — the map is wrong, not the game.
- Your own guesses still read true. The blocks and the arrow after each guess
  are honest; only the clues are reversed.
- The reveal tears a gate (🌀) open where they were hiding, and the shared
  result is stamped 🙃 rather than 🔦.

The mirroring is the puzzle. It makes the clue ladder mean something — clue 2
goes from "walk this way" into a thing you have to flip in your head before you
trust it.

## Warmth

After each guess a ten-block bar fills to show how close you landed — one block
from the far side of town, ten when you have found them, with a word for it
(freezing, cold, warm, hot, boiling). The scale is linear against 9 blocks,
which is roughly the widest gap between two places on the map.

## Prototype notes

- The puzzle is computed client-side, so the answer is visible to anyone who
  reads the source. Fine for a solo daily; it would need a server to be
  competitive.
- With twenty-four hideable places and five guesses, the clues carry the game.
  Clue 4 is close to a giveaway on purpose — it is the reward for surviving
  three misses.
- Fan-made, for personal use. The Stranger Things characters belong to their
  owners; nothing here is copied from the show beyond names and traits.
