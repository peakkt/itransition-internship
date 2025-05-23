## Overview

This project provides a script that processes **256 binary files** to compute their individual **SHA3-256 hashes**, sorts and concatenates those hashes, appends a given **email address**, and outputs the final **SHA3-256 digest**.

---

## Task Description

- Read exactly **256 binary files** from a specified directory.
- Compute the **SHA3-256** hash for each file.
- Represent each hash as **64 lowercase hexadecimal characters**.
- Sort all hashes in **descending** order.
- Concatenate the sorted hashes into a single string *(no separators)*.
- Append the provided **email address** (in lowercase) to that string.
- Compute the **SHA3-256** hash of the final concatenated string and **print it**.

---

## How to Run

1. **Build** the project in release mode:

   ```bash
   cargo build --release
   ```

2. **Run** the compiled binary with the required arguments:

   ```bash
   ./target/release/sha3-hasher --dir ./sha3_inputs --email your_email@example.com
   ```

   - Replace `./sha3_inputs` with the path to the directory containing exactly **256 binary files** named like `file_*.data`.
   - Replace `your_email@example.com` with your actual **email address** in lowercase.

3. **Output**:  
   The program will **print** the final **SHA3-256** hash string to `stdout`.
