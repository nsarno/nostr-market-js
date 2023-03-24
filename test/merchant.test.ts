import { npubToHex } from "../src/client"
import { Merchant, buildMerchant, transform } from "../src/merchant"

describe("Merchant", () => {
  // const relays = ["wss://relay.damus.io"]
  const pk = npubToHex("npub1xjfd6s75j63r0azyrlvqrag83d34gtp7zk8la2grevpq5xh5llws9lwuey") // @AK

  test("transform", () => {
    let merchant : Merchant = {}
    let event = {
      stalls: [{
        id: "pk-stall-1",
        action: "update",
        products: [{
          id: "pk-stall-1-product-1",
          images: [{
            id: "pk-stall-1-product-1-image-1",
            name: "nostremu",
            link: "https://trishansoz.com/trishansoz/animals/images/emu/emu-face-for-mobile-400x400.jpg"
          }]
        }]
      }]
    }
  
    const latest = transform(merchant, event)

    expect(latest).toEqual({
      stalls: [{
        id: "pk-stall-1",
        products: [{
          id: "pk-stall-1-product-1",
          images: [{
            id: "pk-stall-1-product-1-image-1",
            name: "nostremu",
            link: "https://trishansoz.com/trishansoz/animals/images/emu/emu-face-for-mobile-400x400.jpg"
          }]
        }]
      }]
    })
  })

  test("buildMerchant", () => {
    const events = [
      {
        id: "",
        sig: "",
        kind: 21,
        pubkey: pk,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: `{
          "stalls": [{
            "id": "pk-stall-1",
            "action": "update",
            "products": [{
              "id": "pk-stall-1-product-1",
              "images": [{
                "id": "pk-stall-1-product-1-image-1",
                "name": "nostremu",
                "link": "https://trishansoz.com/trishansoz/animals/images/emu/emu-face-for-mobile-400x400.jpg"
              }]
            }]
          }]
        }`
      }
    ]

    expect(buildMerchant(events)).toEqual({
      stalls: [{
        id: "pk-stall-1",
        products: [{
          id: "pk-stall-1-product-1",
          images: [{
            id: "pk-stall-1-product-1-image-1",
            name: "nostremu",
            link: "https://trishansoz.com/trishansoz/animals/images/emu/emu-face-for-mobile-400x400.jpg"
          }]
        }]
      }]
    })
  })
})