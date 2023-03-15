import { listProducts } from "../src/merchant"
import { Relay, connectToRelay, listEvents, npubToHex } from "../src/client"

describe("Merchant", () => {
  let relay : Relay

  beforeAll(async () => {
    relay = await connectToRelay("wss://relay.damus.io")
  })

  afterAll(() => {
    relay.close()
  })

  test("listProducts", async () => {
    const pk = npubToHex("npub1xjfd6s75j63r0azyrlvqrag83d34gtp7zk8la2grevpq5xh5llws9lwuey") // @AK

    expect(listProducts(relay, pk)).toEqual([])
  })
})