import React from 'react';
import Api from './Api';

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
  author: User
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

export interface CartItem {
  product: Product
  count: number
}

export interface DogFoodContext {
  products: Array<Product>
  setProducts: React.Dispatch<React.SetStateAction< Array<Product> >>

  searchText: string
  search: React.Dispatch<React.SetStateAction< string >>

  user: User
  setUser: React.Dispatch<React.SetStateAction< User >>

  cart: Array<CartItem>
  setProducts: React.Dispatch<React.SetStateAction< Array<CartItem> >>
  cartLength: Array<Product>
  setCartLength: React.Dispatch<React.SetStateAction< Array<Product> >>
  addToCart: (product: Product, count: number) => void

  favorites: Array<Product>
  setFavorites: React.Dispatch<React.SetStateAction< Array<Product> >>

  api: Api
  setApi: React.Dispatch<React.SetStateAction< Api >>
}
