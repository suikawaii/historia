import { sha256 } from 'js-sha256';

/**
 * Generate a cryptographically secure random secret (64 hex chars = 32 bytes)
 */
export function generateSecret(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Convert a hex string (with or without 0x prefix) to Uint8Array
 */
function hexToBytes(hex: string): Uint8Array {
  const clean = hex.startsWith('0x') ? hex.slice(2) : hex;
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = parseInt(clean.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Generate commit hash for blind voting — matches the Move contract:
 *   SHA2-256( bcs(address_32_bytes) || vote_byte || secret_bytes )
 *
 * SUI addresses are 32-byte values (0x + 64 hex chars).
 * BCS encoding of a fixed-size address = raw 32 bytes (no length prefix).
 *
 * @param address - Voter's SUI address (0x + 64 hex chars)
 * @param vote    - true = FOR, false = AGAINST
 * @param secret  - Random hex secret from generateSecret()
 * @returns 32-byte SHA256 hash as Uint8Array (for vector<u8> in Move)
 */
export function generateCommitHash(
  address: string,
  vote: boolean,
  secret: string
): Uint8Array {
  const addrBytes = hexToBytes(address); // 32 bytes
  const voteBytes = new Uint8Array([vote ? 1 : 0]);
  const secretBytes = new TextEncoder().encode(secret);

  const preimage = new Uint8Array(addrBytes.length + 1 + secretBytes.length);
  preimage.set(addrBytes, 0);
  preimage.set(voteBytes, addrBytes.length);
  preimage.set(secretBytes, addrBytes.length + 1);

  const hashHex = sha256(preimage);
  return hexToBytes(hashHex);
}

/**
 * Generate commit hash as hex string (for display/storage in localStorage)
 */
export function generateCommitHashHex(
  address: string,
  vote: boolean,
  secret: string
): string {
  const bytes = generateCommitHash(address, vote, secret);
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify a commit hash matches expected values
 */
export function verifyCommitHash(
  address: string,
  vote: boolean,
  secret: string,
  expectedHashHex: string
): boolean {
  return generateCommitHashHex(address, vote, secret) === expectedHashHex;
}
