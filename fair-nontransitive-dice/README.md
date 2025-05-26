## Overview

Create a console application that simulates a generalized non-transitive dice game between a user and the computer.

## Build & Run (Node.js / TypeScript)

Ensure you compile the TypeScript first. Game runs entirely via CLI.

```bash
npm run build
node dist/index.js 2,2,4,4,9,9 1,1,6,6,8,8 3,3,5,5,7,7
```

### Arguments

- At least **three** dice.
- Each die: **comma-separated integers** representing face values.
- All dice must have the **same number of faces**.
- Example (3 dice): `2,2,4,4,9,9` `1,1,6,6,8,8` `3,3,5,5,7,7`

### Invalid Input

On error (invalid number of dice, mismatched face counts, non-integers), show a clear **English error message** with a correct usage example. Do **not** show a stack trace.

---

## Game Rules

1. **Determine who chooses the die first**
   - A fair random value (0 or 1) is selected using the commit-reveal protocol.
   - User must guess the computer's choice.
   - The winner chooses their die first.
   - The second player must choose a **different** die.

2. **Roll Dice**
   - Both players roll their selected dice.
   - Rolls are indexes (0-based) generated via the fair random protocol and mapped to dice faces.
   - Higher face value wins.

---

## Fair Random Number Generation

For each random draw (0/1 selection or dice roll index):

| Step | Computer                              | User                             |
|------|----------------------------------------|----------------------------------|
| 1    | Securely generate value `x ∈ 0..n-1`   |                                  |
| 2    | Securely generate 256-bit+ key         |                                  |
| 3    | Show `HMAC_SHA3(key, x)`               |                                  |
| 4    |                                        | User picks `y ∈ 0..n-1`          |
| 5    | Compute `(x + y) % n`                  |                                  |
| 6    | Reveal `x`, `key`, and final result    |                                  |

**Notes:**
- Use crypto-secure randomness.
- Ensure uniformity (no `%` bias).
- Reveal values only after user commits.
  Use **standard and third-party libraries** wherever applicable.
---

## Help Menu

When `?` is selected:

- Display a table of **user win probabilities** against each opponent die.
- Use a **3rd-party library** for rendering (e.g., cli-table3).
- Table requirements:
   - Highlight header row
   - Dynamic column widths (integers may be >9)
   - Diagonal may display `-` or self-probability
   - Optional descriptive header

Example:

```
Probability of the win fоr the user:
+-------------+-------------+-------------+-------------+
| User dice v | 2,2,4,4,9,9 | 1,1,6,6,8,8 | 3,3,5,5,7,7 |
+-------------+-------------+-------------+-------------+
| 2,2,4,4,9,9 | - (0.3333)  | 0.5556      | 0.4444      |
+-------------+-------------+-------------+-------------+
| 1,1,6,6,8,8 | 0.4444      | - (0.3333)  | 0.5556      |
+-------------+-------------+-------------+-------------+
| 3,3,5,5,7,7 | 0.5556      | 0.4444      | - (0.3333)  |
+-------------+-------------+-------------+-------------+
```
