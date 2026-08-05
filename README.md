# Home Before Dinner

A daily hide-and-seek game played on a small fictional town, loosely shaped
after the middle of Bethpage, NY. Someone from Hawkins is hiding at one of
twenty-two places, and they were supposed to be home before dinner. You get
clues, you search a place, and the town tells you how far off you were.

A crooked missing poster at the top of the panel says who you are looking for:
HAVE YOU SEEN, the face, the name.

## Playing

Open `index.html` in a browser. That is the whole game — one file, no build, no
dependencies, no network at all.

The map takes 55% of the screen. The panel below it keeps the guess and New
hunt buttons pinned on one row so they are always in reach, scrolls the clues
above them, and scrolls the newest clue into view each time a miss buys one.

On a desktop the map fills the whole window and the panel floats over it —
clues in a card at the top right, the buttons at the bottom left — so nothing
takes space away from the town. The resting view is biased left by half of what
the clue card covers, so every place stays visible and clickable rather than
hiding underneath it.

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
- **Clue 2** — the direction, named after a landmark you can see: "they went out
  the 🏊 Community Pool way". A flashlight beam fans out across the map to match.
- **Clue 3** — the distance as a walk: "a 2 to 3 minute walk from The Town", with
  a glowing ring drawn at that range. Where the beam and the ring cross is where
  to look.
- **Clue 4** — why they picked the place they picked

No compass points and no block counts: nobody knows which way north is on a
drawing, and "3.5 blocks from the green" told you nothing. Guess feedback is in
minutes too — "≈4 min away". One block is about a two-minute walk.

Clues are listed newest first, so the one a miss just bought is at the top of
the panel and never needs scrolling to.

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

Twenty-two locations, one block = 100 units:

🏛️ The Town · 🍕 Pappardelle's Pizzeria · 📚 Public Library · 🎒 Middle School ·
🏫 High School · 🗼 Water Tower · 🥤 The Grand Diner · 👾 Palace Arcade ·
💈 Lucky Salon · 🚂 Train Station · ⛰️ The Old Bowl · 🏊 Community Pool ·
⚾ Baseball Field · 📻 Sparks Radio · 🔧 Smithy's Hardware · 🥯 Stuff a Bagel ·
☕ Mongo's Coffee · 🥂 Campagne House · 📼 Family Video · 🧪 Hawkins Lab ·
🛍️ Starcourt Mall · 🍪 Crumbl Cookies

Palace Arcade, Family Video, Hawkins Lab and Starcourt Mall are on loan from
Hawkins; the bagels, the salon, the coffee, the cookies and Campagne House are
pure Bethpage. The arcade goes unlabelled — the neon on the front says enough.

The town is drawn like a crayon map: cream paper, every block coloured in with
its own pastel, dashed yellow centrelines down the big streets, a smiling sun in
the corner, and a turbulence filter over the ground so nothing is quite
straight.

Shading is one flat colour per block — nothing is layered on top. Where a
block is a place, the whole block takes its colour: the pines and the ball
fields are green, the pond block is blue.

Thirteen places are built rather than lettered — the Mall, Hawkins Lab, the
Pool, the Baseball Field, the Water Tower, the Train Station, the Grand Diner,
the High School, the Pizzeria, the Library, Palace Arcade, Crumbl Cookies and
Campagne House — little models in perspective with a lit face, a shaded side and a
roof, so they stand up off the paper.

Nothing crowds anything else: no two markers overlap, no two labels overlap,
and no label sits on a neighbouring marker. The closest two places — the
Community Pool and Stuff a Bagel — are 121 units apart, comfortably clear of
the 70-unit tap radius.

The town has surroundings, seen when a wide screen looks past it: a meadow and
an orchard to the west, and to the east a lake with a duck, fields with a
tractor, and a playground where a kid swings and a ball bounces. A cyclist
crosses Central Ave and a drawn freight train crosses the rail line — each
finishes its pass, rests a few seconds, and comes back from a random side, and
there is only ever one of each. Markers idle with
a gentle bob and grow a fifth larger under the mouse; by nightfall the kids
and the cyclist have gone home, though the freight has not. All of it stands
still for players who prefer reduced motion.

Streets, blocks and the railway are all drawn from the `STREETS`, `BLOCKS` and
`PLACES` arrays at the top of the script — move a coordinate and the town
redraws. Adding a location means adding one entry
with an `x`, a `y` and a `hint`; the clue system picks it up automatically.

## Admin mode

Add `?admin` to the URL — `index.html?admin` — and every place becomes
draggable. The clock stays parked at five o'clock, since arranging the town is
not a hunt. A panel appears with:

- a **live overlap check**: no marker on a marker, no label on a label, no label
  on a neighbouring marker, and nothing hidden under the floating panels — a
  place under the clue card cannot be clicked at all
- **Remove / Restore** for the selected place. Click a place to select it;
  removed ones grey out with their name struck through and drop out of the
  export, which notes them in a trailing comment
- **Copy map**, which puts the layout on the clipboard as pasteable `PLACES`
  lines
- **Reset**, which throws the edits away
- a **minimise** button in the corner, remembered between visits

The map frame is computed from the places themselves, so dragging one out to the
edge of the county grows the map to include it rather than losing it.

Moves are kept in `localStorage` for that browser only, so the published game
always shows the committed layout. Paste the copied lines back into `PLACES` to
make a new arrangement permanent.

## Who hides

Eleven, Dustin, Max, Will, Steve and Vecna — plus Ayan, Deepak and Smriti, who
are not from Hawkins but hide just as well. Nine in all.

The three of them are written with they/them, since their pronouns have never
been stated. Set them in the `CAST` array whenever you like.

**Vecna costs you a guess.** On the days he is the quarry you get four instead
of five, and the panel warns you up front.

## The clock

You go out at **5:00 PM**. A toggle in the top corner sets the pace: **Fast**
runs an hour every fifteen seconds (the whole evening in one minute), **Slow**
gives you twice that. Switching mid-hunt keeps the clock where it stands, and
the choice is remembered.

- **7:30 PM** — the light starts to go, and the vines start coming through.
  The town dims steadily from here and the clock turns red.
- **9:00 PM** — it is fully dark, the vines have taken the town, and whoever is
  still out there is not coming home. The hunt ends whatever guesses you had
  left.

Night falls on the map alone — the panel, clues and buttons stay in daylight
the whole way through, so everything stays readable while the town goes dark.
Along with the dimming and the vines, spores drift up over the map and the
smiling sun in the corner goes out and loses its face.

Six street lamps stand along the main roads. At **8:00 PM** they come on, and
their pools of light are the last warm thing left as the town goes dark.

The clock stops the moment the hunt ends, and New hunt puts it back to five
o'clock. It runs per round rather than being stored, so a reload starts the
evening over.

## Warmth

After each guess a ten-block bar fills to show how close you landed — one block
from the far side of town, ten when you have found them, with a word for it
(freezing, cold, warm, hot, boiling). The scale is linear against the widest
gap between any two places, measured from `PLACES` when the page loads, so
moving the town around rescales the bar automatically.

## Prototype notes

- The puzzle is computed client-side, so the answer is visible to anyone who
  reads the source. Fine for a solo daily; it would need a server to be
  competitive.
- With twenty-one hideable places and five guesses, the clues carry the game.
  Clue 4 is close to a giveaway on purpose — it is the reward for surviving
  three misses.
- Fan-made, for personal use. The Stranger Things characters belong to their
  owners; nothing here is copied from the show beyond names and traits.
