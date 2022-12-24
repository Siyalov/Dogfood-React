/** @typedef {import('./typings').Product} Product */
/** @typedef {import('./typings').NewProduct} NewProduct */
/** @typedef {import('./typings').User} User */
/** @typedef {import('./typings').UserAuthorization} UserAuthorization */
/** @typedef {import('./typings').Review} Review */

class Api {
  /**
   * @param {string} token 
   */
  constructor(token) {
    this.path = "https://api.react-learning.ru";
    this.token = token;
  }
  /**
   * @returns {Promise<{
   *  products: Array<Product>,
   *  total: number
   * }>}
   */
  getProducts() {
    return fetch(`${this.path}/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then((res) => res.json());
  }
  /**
   * @param {string} id
   * @returns {Promise<Product>}
   */
  getProduct(id) {
    return fetch(`${this.path}/products/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then((res) => res.json());
  }
  /**
   * @param {import('./typings').NewProduct} body
   * @returns {Promise<Product>}
   */
  addProduct(body) {
    return fetch(`${this.path}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
  /**
   * @param {string} id
   * @param {NewProduct} body
   * @returns {Promise<Product>}
   */
  updProduct(id, body) {
    return fetch(`${this.path}/products/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
  /**
   * @param {string} id 
   * @returns {Promise<unknown>}
   */
  delProduct(id) {
    return fetch(`${this.path}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then((res) => res.json());
  }
  /**
   * Authorization
   * @param {UserAuthorization} body
   * @returns {Promise<{
   *   data: User,
   *   token: string
   * }>}
   */
  logIn(body) {
    return fetch(`${this.path}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
  /**
   * @param {UserAuthorization} body 
   * @returns {Promise<unknown>}
   */
  singUp(body) {
    return fetch(`${this.path}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
  /**
   * @returns {Promise<User>}
   */
  showProfile() {
    return fetch(`${this.path}/v2/group-7/users/me`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then((res) => res.json());
  }
  /**
   * @param {string} id
   * @param {boolean} flag - поставить лайк (`true`) или снять (`false`)
   * @returns {Promise<Product>}
   */
  setLike(id, flag) {
    return fetch(`${this.path}/products/likes/${id}`, {
      method: flag ? "PUT" : "DELETE",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then((res) => res.json());
  }
  /**
   * @param {string} productId
   * @returns {Promise<Array<Review>>}
   */
  getProductReviews(productId) {
    return fetch(`${this.path}/products/review/${productId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then((res) => res.json());
  }
  /**
   * @returns {Promise<Array<Review>>}
   */
  getAllReviews() {
    return fetch(`${this.path}/products/review/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then((res) => res.json());
  }
  /**
   * @param {string} productId
   * @param {string} reviewId
   * @returns {Promise<unknown>}
   */
  deleteProductReview(productId, reviewId) {
    return fetch(`${this.path}/products/review/${productId}/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then((res) => res.json());
  }
  /**
   * @param {string} productId
   * @param {Review} review
   * @returns {Promise<unknown>}
   */
  addProductReview(productId, review) {
    return fetch(`${this.path}/products/review/${productId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    }).then((res) => res.json());
  }
}
export default Api;
