import { listEvents  } from "./client"
import { Event } from "nostr-tools"

type ProductImage = {
  id: string,
  name?: string,
  link?: string
}

type Product = {
  id: string,
  name?: string,
  description?: string,
  categories?: string,
  amount?: number,
  price?: number,
  images?: Array<ProductImage>,
  action?: string
}

type Stall = {
  id: string,
  name?: string,
  description?: string,
  categories?: string,
  shipping?: string,
  action?: string
  products?: Array<Product>
}

type Shipping = {
  id: string,
  zone?: string,
  price?: number
}

export type Merchant = {
  name?: string,
  description?: string,
  currency?: string,
  shipping?: Array<Shipping>,
  stalls?: Array<Stall>,
  action?: string
}

const ACTIONS = [
  "update",
  "delete"
]

export function publish(event: Merchant) {

}

interface Indexable { id: string }
function index(collection: Array<Indexable>) : { [key: string]: Indexable } {
  let acc : { [key: string]: Indexable } = {}

  collection.forEach((item: Indexable) => {
    acc[item.id] = item
  })

  return acc
}

function copyProductImage(origin: ProductImage, vector: ProductImage) : ProductImage {
  let copy = origin

  vector.id && (copy.id = vector.id)
  vector.name && (copy.name = vector.name)
  vector.link && (copy.link = vector.link)

  return copy
}

function copyProduct(origin: Product, vector: Product) : Product {
  let copy = origin

  vector.id && (copy.id = vector.id)
  vector.name && (copy.name = vector.name)
  vector.description && (copy.description = vector.description)
  vector.categories && (copy.categories = vector.categories)
  vector.amount && (copy.amount = vector.amount)
  vector.price && (copy.price = vector.price)

  if (vector.images) {
    copy.images ||= []
    copy.images = vector.images.reduce((images, image) => transformImages(images, image), copy.images)
  }

  return copy
}

function copyStall(origin: Stall, vector: Stall) : Stall {
  let copy = origin

  vector.id && (copy.id = vector.id)
  vector.name && (copy.name = vector.name)
  vector.description && (copy.description = vector.description)
  vector.categories && (copy.categories = vector.categories)
  vector.shipping && (copy.shipping = vector.shipping)

  if (vector.products) {
    copy.products ||= []
    copy.products = vector.products.reduce((products, product) => transformProducts(products, product), copy.products)
  }
    

  return copy
}

function copyShipping(origin: Shipping, vector: Shipping) : Shipping {
  let copy = origin

  vector.id && (copy.id = vector.id)
  vector.zone && (copy.zone = vector.zone)
  vector.price && (copy.price = vector.price)

  return copy
}

function transformImages(origin: Array<ProductImage>, vector: ProductImage) : Array<ProductImage> {
  let indexedPI = index(origin)
  
  indexedPI[vector.id] ||= {} as ProductImage
  indexedPI[vector.id] = copyProductImage(indexedPI[vector.id], vector)

  return Object.values(indexedPI)
}

function transformProducts(origin: Array<Product>, vector: Product) : Array<Product> {
  let indexedProducts = index(origin)
  
  indexedProducts[vector.id] ||= {} as Product
  indexedProducts[vector.id] = copyProduct(indexedProducts[vector.id], vector)

  return Object.values(indexedProducts)
}


function transformStall(origin: Array<Stall>, vector: Stall) : Array<Stall> {
  let indexedStalls = index(origin)
  
  indexedStalls[vector.id] ||= {} as Stall
  indexedStalls[vector.id] = copyStall(indexedStalls[vector.id], vector)

  return Object.values(indexedStalls)
}

function transformShipping(origin: Array<Shipping>, vector: Shipping) : Array<Shipping> {
  let indexedShipping = index(origin)
  
  indexedShipping[vector.id] ||= {} as Shipping
  indexedShipping[vector.id] = copyShipping(indexedShipping[vector.id], vector)

  return Object.values(indexedShipping)
}

export function transform(origin: Merchant, vector: Merchant) : Merchant {
  let merch = origin

  vector.name && (merch.name = vector.name)
  vector.description && (merch.description = vector.description)
  vector.currency && (merch.currency = vector.currency)

  if (vector.stalls) {
    merch.stalls ||= []
    merch.stalls = vector.stalls.reduce((stalls, stall) => transformStall(stalls, stall), merch.stalls)
  }

  if (vector.shipping) {
    merch.shipping ||= []
    merch.shipping = vector.shipping.reduce((shippings, shipping) => transformShipping(shippings, shipping), merch.shipping)
  }

  return merch
}

export function buildMerchant(events: Array<Event>) : Merchant {
  return events.reduce((merchant, event) => transform(merchant, JSON.parse(event.content)), {})
}

export async function restore(relays: Array<string>, pk: string) : Promise<Merchant> {
  const NIP_MKT = 21 // placeholder for marketplace event kind

  const events = await listEvents(relays, pk, { kinds: [ NIP_MKT ] })
  return buildMerchant(events)
}
