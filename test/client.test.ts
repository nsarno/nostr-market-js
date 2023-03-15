import { listEvents, npubToHex } from "../src/client"

describe("Client", () => {
  const relays = ["wss://relay.damus.io"]

  test("listEvents", async () => {
    const pk = npubToHex("npub1xjfd6s75j63r0azyrlvqrag83d34gtp7zk8la2grevpq5xh5llws9lwuey") // @AK

    const events = await listEvents(relays, pk, { limit: 1 })
    expect(events.length).toEqual(1)
  })
})