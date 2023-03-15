import { Relay } from "nostr-tools"

type Product = {
  id: string,
  name: string,
  description: string,
  categories: string,
  amount: number,
  price: number,
  images: [
      {
          id: string,
          name: string,
          link: string
      }
  ]
}

type Stall = {
  id: number,
  name: string,
  description: string,
  categories: string,
  shipping: string,
  action: string
  products: Array<Product>
}

export function restoreCatalog(pool:)

// pk: merchant's public key
// returns a list of available products from the merchant
export function listProducts(relay: Relay, pk: string) : Array<Product> {
  return []
}