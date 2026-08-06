# Home Before Dinner

A daily hide-and-seek game played on a small fictional town with two maps of
itself: the crayon-drawn Town, and the City — a Manhattan-style grid with the
same Bethpage names on it. Someone from Hawkins is hiding at one of
twenty-two places, and they were supposed to be home before dinner. You get
clues, you search a place, and the town tells you how far off you were.

A crooked missing poster at the top of the panel says who you are looking for:
HAVE YOU SEEN, the face, the name.

## Playing

Open `index.html` in a browser. That is the whole game — one file plus a
vendored copy of GSAP in `vendor/` for the taxis, no build, no network at all.

The map takes 55% of the screen. The panel below it keeps the guess and New
hunt buttons pinned on one row so they are always in reach, scrolls the clues
above them, and scrolls the newest clue into view each time a miss buys one.

On a desktop the map fills the whole window and the panel floats over it —
clues in a card at the top right, the buttons at the bottom left — so nothing
takes space away from the town. The resting view is biased left by half of what
the clue card covers, so every place stays visible and clickable rather than
hiding underneath it.

It is built for a phone. A tap counts for the nearest place within 90 map
units on the City (70 on the tighter Town), so the targets are finger-sized without any
overlapping circles drawn on the map. Safe-area insets keep the controls clear
of the notch and the home indicator, `dvh` units keep the layout honest while
Safari's toolbar slides in and out, and adding it to the home screen gives it a
name and an icon.

Everything is measured from **The Town**, the park in the middle of the grid.
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
drawing, and "3.5 blocks from the park" told you nothing. Guess feedback is in
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

## The maps

A 🖍️ **Town** / 🗽 **City** toggle sits in the header. Both maps hold the same
twenty-two places, so the day's hunt carries straight across — switching
remembers your choice, reloads, and remeasures every distance on the map you
land on. `?map=town` or `?map=city` in the URL forces one.

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

**The Town** is the original: a crayon drawing on cream paper, every block
coloured in with its own pastel, dashed yellow centrelines down the big
streets, a smiling sun in the corner that goes out after dark, and a
turbulence filter over the ground so nothing is quite straight. Around it sit
the meadow, the orchard, a lake with a duck, fields with a tractor and a cow,
and a full-size playground with a swing, a slide and a ball.

**The City** is a grid, easy to follow the way the real one is: six avenues
(10th, 8th, 7th, 5th, Park, Lexington) cross six streets (59th down to 49th),
all black asphalt with a double yellow line down every avenue, broken white
lanes on the streets, zebra crossings on all four sides of every intersection,
and the street names painted straight onto the tarmac. Every lot keeps a
pastel from the old box of crayons, wrapped in a grey sidewalk, so the map
stays friendly while the streets stay legible.

**But nobody laid it with a ruler.** No road is quite the width of its
neighbour — the streets run 32 to 40 units and the avenues 38 to 48, with Park
Ave a 52-unit boulevard — and no two intersections line up exactly, so an
avenue is a polyline through its own crossings rather than a straight line and
every block is a slightly different quadrilateral. The lane paint follows the
kinks, the crosswalks take their width from the two roads that meet there, and
the block shapes fall out of wherever the corners landed. The one hard floor is
the narrowest street: it still has to hold a cab driving a lane's width off the
centreline, which is what sets the minimum.

**One block breaks the rules.** The lot between Broadway and 5th has been dug
open: hoarding round the edge, the ground torn up, spoil left in a heap, a
crane over it and cones along the kerb. Another lot is cut clean in two by a
service alley running through the middle of it, with a dumpster down the far
end and a fire escape on the wall beside it. Both are built from the lot they
sit on, so they follow their block wherever the jitter put it.

The roads themselves are patchworked: repaved rectangles in a slightly
different black, laid at a slight angle to the road, with tar seams wandering
along beside them where the trench was filled back in. The patches go down
before the blocks, so whatever falls outside a road is covered by the block on
top of it.

Nothing else is quite perfect either. The paint is worn: every line is laid
down in a few runs of different fadedness, a stretch here and there has gone
altogether, some crossings have lost a stripe from one end, and no street-name
stencil is quite square. The island's edge is nibbled all the way round rather
than ruled, with a pier sticking out into the water on each side. Hydrants
stand on the corners, scaffolding is up against the high school, and a vent in
5th Ave has been steaming for years — each of them pinned to the block or road
it belongs to rather than to a fixed coordinate. All of it is drawn from one fixed seed, so
the city wears the same way every time it is drawn — a new hunt does not
repave the streets.

On the City every place owns a whole block, and three lots are left over —
one dug up, one split by the alley, one still empty. On both maps every one of the twenty-two is built
rather than lettered — big models in perspective with a lit face, a shaded
side and a roof. The Town itself is the park in the middle of the grid: lawn,
a pond, two paths that meet at the gazebo, trees, and a small swing where a
kid still swings.

The grid floats in the river. 55th St runs out over a suspension bridge on
each side and the elevated line crosses on its own trestle, so a wide desktop
sees water, bridges and boats past the island, and a phone sees the river
above and below it.

**Taxis.** Five yellow cabs work the grid, driven by GSAP's MotionPathPlugin
(vendored, so the game still loads offline). The roads are held as a graph —
nodes are the real, jittered intersections and edges run between neighbours —
so a cab follows whatever bends a road actually has rather than assuming
straight lines. Each cab picks a random run of turns through that graph —
mostly straight on, never a U-turn — keeps to the right-hand side of the road,
rounds its corners on a real curve, runs out to the edge of the grid before
driving off the map, rests a few seconds, and picks a new route. Traffic is
clipped to the island, so a cab on its way out stops at the coast, or takes
the bridge if it left on 55th. After dark their headlights come on. A cyclist still crosses on 55th
and the freight still rattles over the trestle, one of each at a time, and
everything stands still for players who prefer reduced motion.

Markers idle with a gentle bob and grow a fifth larger under the mouse; by
nightfall the kid on the swing and the cyclist have gone home, though the
freight and the cabs have not.

Nothing crowds anything else on either map: City places sit a full block
apart (230 units); the Town packs them as close as 121, still clear of its
70-unit tap radius. The admin overlap check agrees at phone and desktop sizes
alike, on both.

The City grid is drawn from the `AVX`/`STY` avenue and street tables, jittered
into the `NODE` table of real intersections; the
Town from its own `TOWN_STREETS`/`TOWN_BLOCKS`, and both share the
`PLACES` array at the top of the script — move a coordinate and the city
redraws. Adding a location means adding one entry with an `x`, a `y` and a
`hint`; the clue system picks it up automatically.

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

Moves are kept in `localStorage` for that browser only, separately per map, so the published game
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
Along with the dimming and the vines, spores drift up over the map; the City
cabs switch their headlights on, and the Town's smiling sun goes out and
loses its face.

Six street lamps stand on the corners around the park (or along the Town's big roads). At **8:00 PM** they come on, and
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
