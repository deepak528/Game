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

Streets, blocks, parks, the pond, the woods and the railway are all drawn from
the `STREETS`, `BLOCKS`, `AREAS` and `PLACES` arrays at the top of the script —
move a coordinate and the town redraws. Adding a location means adding one entry
with an `x`, a `y` and a `hint`; the clue system picks it up automatically.

## Who hides

Eleven, Dustin, Max, Will, Steve and Vecna — plus Ayan and Deepak Smithy, who
are not from Hawkins but hide just as well.

**Vecna costs you a guess.** On the days he is the quarry you get four instead
of five, and the panel warns you up front.

## The Upside Down

Roughly one day in three the gate is open. When it is, the town keeps its
daylight crayon colours — the gate shows up as growth, not darkness:

- **Red vines creep in from the edges of the drawing**, over blocks and
  streets, and the longest one reaches the green and stops. Spores drift up
  over the map, the smiling sun goes dark and loses its face, and the sign
  over the door reads backwards.
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
