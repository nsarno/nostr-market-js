const { RelayPool } = require("nostr")
import { npubToHex } from "./client"

const jb55 = "32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245"
const me = npubToHex("npub1zrmudt43rr3v3kqeaxlfjzemxraghc37vnd5sgj0yka49m9jpwts7qutk6")

const brb = "wss://brb.io"
const snort = "wss://relay.snort.social"
const damus = "wss://relay.damus.io"
const scsi = "wss://nostr-pub.wellorder.net"
const relays = [snort, brb, damus, scsi]

const pool = RelayPool(relays)

pool.on('open', (relay: any) => {
	relay.subscribe("subid", {
    limit: 2,
    kinds: [1],
    authors: [me, jb55]
  })
});

pool.on('eose', (relay: any) => {
	relay.close()
});

pool.on('event', (relay: any, sub_id: string, ev: any) => {
	console.log(ev)
});