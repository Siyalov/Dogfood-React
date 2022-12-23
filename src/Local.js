class Local {
  /**
   * @param {string} name
   * @param {boolean} asJSON
   * @returns {string | any}
   */
  static getItem(name, asJSON = false) {
    let data = localStorage.getItem(name);
    if (!data) return "";

    if (asJSON) {
      return JSON.parse(data);
    } else {
      return data;
    }
  }

  /**
   * @param {string} name
   * @param {string | any} data
   * @param {boolean} asJSON
   */
  static setItem(name, data, asJSON = false) {
    if (asJSON) {
      localStorage.setItem(name, JSON.stringify(data));
    } else {
      localStorage.setItem(name, data);
    }
  }
}

export default Local;
