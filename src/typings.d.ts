
export interface User {
  about: string
  avatar: string
  email: string
  group?: string
  name: string
  __v?: number
  _id: string
}

export interface UserAuthorization {
  email: string
  password: string
}

export interface Review {
  author: string
  /** Формат: 2022-03-12T10:37:00.464Z */
  created_at: string
  product: string
  rating: number
  text: string
  /** Формат: 2022-03-12T10:37:00.464Z */
  updated_at: string
  __v: number
  _id: string
}

export type Tag = 'new' | 'sale';

export interface Product {
  author: User
  available: boolean
  /** Формат: 2022-03-12T10:37:00.464Z */
  created_at: string
  description: string
  /** Проценты (0 .. 100) */
  discount: number
  isPublished: boolean
  likes: Array<string>
  name: string
  pictures: string
  price: number
  reviews: Array<Review>
  stock: number
  tags: Array<Tag>
  /** Формат: 2022-03-12T10:37:00.464Z */
  updated_at: string
  wight: string
  __v: number
  _id: string
}

// extract types and names from Product
export type NewProduct = Pick<Product,
  "available"
  | "pictures"
  | "name"
  | "price"
  | "discount"
  | "stock"
  | "wight"
  | "description"
>
