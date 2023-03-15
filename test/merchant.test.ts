import { listProducts } from "../src/merchant"
import { npubToHex } from "../src/client"

describe("Merchant", () => {
  let relays = ["wss://relay.damus.io"]

  test("listProducts", async () => {
    const pk = npubToHex("npub1xjfd6s75j63r0azyrlvqrag83d34gtp7zk8la2grevpq5xh5llws9lwuey") // @AK

    expect(listProducts(relays, pk)).toEqual([])
  })
})