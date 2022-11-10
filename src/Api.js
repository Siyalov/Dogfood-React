class Api {
    constructor(t) {
        this.path = "https://api.react-learning.ru";
        this.token = t;
    }
    getProducts() {
        return fetch(`${this.path}/products`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        })
            .then(res => res.json());
    }
    getProduct(id) {
        return fetch(`${this.path}/products/${id}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        })
            .then(res => res.json());
    }
    addProduct(body) {
        return fetch(`${this.path}/products`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json());
    }
    updProduct(id, body) {
        return fetch(`${this.path}/products/${id}`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json());
    }
    delProduct(id) {
        return fetch(`${this.path}/products/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${this.token}`
            },
        })
            .then(res => res.json());
    }
    logIn(body) {
        return fetch(`${this.path}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json());
    }
    singUp(body) {
        return fetch(`${this.path}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json());
    }
}
export default Api;