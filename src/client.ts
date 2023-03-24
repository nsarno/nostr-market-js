import "websocket-polyfill"

import { SimplePool, Filter } from "nostr-tools"
import { bech32 } from "bech32"
import { Event } from "nostr-tools"

export function npubToHex(npub: string) : string {
  const { prefix, words } = bech32.decode(npub);

  if (prefix !== "npub") {
    throw new Error("not an npub key")
  }

  const bytes = bech32.fromWords(words).slice(0, 32)
  const pubkey = Buffer.from(bytes).toString("hex")

  return pubkey
}

export async function listEvents(relays: Array<string>, pk: string, options: Filter = {}) : Promise<Array<Event>> {
  const pool = new SimplePool()
  const filters = [{
    kinds: [1],
    authors: [pk],
    ...options
  }]

  return await pool.list(relays, filters)
}
