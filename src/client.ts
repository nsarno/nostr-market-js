import "websocket-polyfill"
import { Relay, relayInit, Filter } from "nostr-tools"
import { bech32 } from "bech32"
export { Relay } from "nostr-tools"

export function npubToHex(npub: string) : string {
  const { prefix, words } = bech32.decode(npub);

  if (prefix !== "npub") {
    throw new Error("not an npub key")
  }

  const bytes = bech32.fromWords(words).slice(0, 32)
  const pubkey = Buffer.from(bytes).toString("hex")

  return pubkey
}

export async function connectToRelay(r: string) : Promise<Relay> {
  const relay = relayInit(r)

  // relay.on('connect', () => {
  //   console.log(`connected to ${relay.url}`)
  // })

  relay.on('error', () => {
    console.log(`failed to connect to ${relay.url}`)
  })
  
  await relay.connect()

  return relay
}

export async function listEvents(relay: Relay, pk: string, options: Filter) {
  const filters = [{
    kinds: [1],
    authors: [pk],
    ...options
  }]

  return await relay.list(filters)
}