import { Relay, connectToRelay, listEvents, npubToHex } from "../src/client"

describe("Client", () => {
  let relay : Relay

  beforeAll(async () => {
    relay = await connectToRelay("wss://relay.damus.io")
  })

  afterAll(() => {
    relay.close()
  })

  test("listEvents", async () => {
    const pk = npubToHex("npub1xjfd6s75j63r0azyrlvqrag83d34gtp7zk8la2grevpq5xh5llws9lwuey") // @AK

    const events = await listEvents(relay, pk, { limit: 1 })
    expect(events.length).toEqual(1)
  })
})