## Overview

This project contains a Node.js script, `lcs.js`, which computes and prints the **longest common substring** from a set of command-line arguments.  
The solution is intended to be as compact as possible, **minimizing the file size** (code golf).

---

## Task Description

- Implement a JavaScript script, `lcs.js`, that **prints the longest common substring** among all input strings provided as command-line arguments.
- The script should use only **Node.js built-in features** and **must not use any external libraries or packages**.
- **Input** is received via `process.argv` only.  
  **Do not** read from standard input, files, or any external sources.
- **Output**: The script must print the longest common substring (followed by a newline) to the standard output, using `console.log`.  
  No extra characters, error/debug messages, or additional newlines are allowed.
- If there are multiple substrings of maximal length, output any one of them.
- If **no arguments** are provided, or there is **no common substring**, print a single newline.

---

## Requirements

- **File name**: `lcs.js` (all lowercase).
- **No comments, no long names, no indents, etc.**  
  The **smaller** the file size, the **better**.
- **No external dependencies**: Do not use imports, require, or any packages.
- **No access to external world**:
    - Do not read or write files.
    - Do not use network connections.
    - Do not use process.stdin, readline, or similar.
- **Handle zero-argument case gracefully** (should not crash or throw errors).
- **Do not use `process.exit()` with a non-zero code.**
- **The script will be tested with various edge cases. If any test fails, the score is zero.**

---

## Examples

```bash
# No arguments
node lcs.js
(prints a single newline)

# Two arguments, with a common substring
node lcs.js ABCDEFZ WBCDXYZ
BCD

# Multiple arguments
node lcs.js 132 12332 12312
1

node lcs.js ABCDEFGH ABCDEFG ABCEDF ABCED
ABC

node lcs.js ABCDEFGH ABCDEFG ABCDEF ABCDE
ABCDE

node lcs.js ABCDEFGH ABCDEFG ABCDEF ABCDE EDCBA
A

node lcs.js ABCDEFGH ABCDEFG ABCDEF ABCDE EDCBCA
BC

node lcs.js ABCDEFGH ABCDEFG AxBCDEF ABCDxE EDCBCAABCD
BCD

# Arguments with no common substring (prints a single newline)
node lcs.js ABCDEFGH 1234

# Single argument (prints the string itself)
node lcs.js ABCDEFGH
ABCDEFGH
