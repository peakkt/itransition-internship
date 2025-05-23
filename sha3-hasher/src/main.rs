use std::{fs, io::{self, Read}, path::PathBuf};
use clap::Parser;
use sha3::{Digest, Sha3_256};
use anyhow::{Result, Context};
use glob::glob;

#[derive(Parser, Debug)]
struct CliConfig {
    #[arg(short, long)]
    dir: PathBuf,
    #[arg(short, long)]
    email: String,
}

trait Hasher {
    fn hash_reader(&self, reader: impl Read) -> io::Result<String>;
    fn hash_bytes(&self, data: impl AsRef<[u8]>) -> String;
}

struct Sha3Hasher;

impl Hasher for Sha3Hasher {
    fn hash_reader(&self, mut reader: impl Read) -> io::Result<String> {
        let mut hasher = Sha3_256::new();
        let mut buf = [0; 8 * 1024];
        loop {
            let n = reader.read(&mut buf)?;
            if n == 0 { break; }
            hasher.update(&buf[..n]);
        }
        Ok(hex::encode(hasher.finalize()))
    }

    fn hash_bytes(&self, data: impl AsRef<[u8]>) -> String {
        hex::encode(Sha3_256::digest(data.as_ref()))
    }
}

struct DataFile {
    path: PathBuf,
}

impl DataFile {
    fn new(path: PathBuf) -> Option<Self> {
        if let Some(name) = path.file_name().and_then(|n| n.to_str()) {
            if name.starts_with("file_") && name.ends_with(".data") {
                return Some(DataFile { path });
            }
        }
        None
    }

    fn hash(&self, hasher: &impl Hasher) -> io::Result<String> {
        let file = fs::File::open(&self.path)
            .map_err(|e| io::Error::new(e.kind(), format!("Failed to open {:?}: {}", self.path, e)))?;
        hasher.hash_reader(file)
    }
}

struct Processor<H: Hasher> {
    dir: PathBuf,
    email: String,
    hasher: H,
}

impl<H: Hasher> Processor<H> {
    fn new(config: CliConfig, hasher: H) -> Self {
        Processor {
            dir: config.dir,
            email: config.email.to_lowercase(),
            hasher,
        }
    }

    fn run(&self) -> Result<()> {
        let files = self.collect_data_files()?;
        let mut hashes = self.hash_files(&files)?;
        hashes.sort_unstable_by(|a, b| b.cmp(a));
        ensure_count(&hashes, 256)?;
        let final_hash = self.compute_final(&hashes);
        println!("{}", final_hash);
        Ok(())
    }

    fn collect_data_files(&self) -> io::Result<Vec<DataFile>> {
        let pattern = self.dir.join("file_*.data").to_string_lossy().into_owned();
        let mut files = Vec::new();
        for entry in glob(&pattern)
            .map_err(|e| io::Error::new(io::ErrorKind::InvalidInput, e.msg))?
            .filter_map(Result::ok)
            .filter_map(DataFile::new)
        {
            files.push(entry);
        }
        Ok(files)
    }

    fn hash_files(&self, files: &[DataFile]) -> io::Result<Vec<String>> {
        files.iter()
            .map(|df| df.hash(&self.hasher))
            .collect()
    }

    fn compute_final(&self, hashes: &[String]) -> String {
        let combined = hashes.concat() + &self.email;
        self.hasher.hash_bytes(combined)
    }
}

fn ensure_count(hashes: &[String], expected: usize) -> Result<()> {
    if hashes.len() != expected {
        anyhow::bail!("Expected {} data files, found {}", expected, hashes.len());
    }
    Ok(())
}

fn main() -> Result<()> {
    let config = CliConfig::parse();
    let processor = Processor::new(config, Sha3Hasher);
    processor.run().context("Processor execution failed")
}
