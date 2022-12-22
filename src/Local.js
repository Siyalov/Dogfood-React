class Local {
   static getItem(name, asJSON = false) {
      let data = localStorage.getItem(name);
      if (!data) return '';

      if (asJSON) {
         return JSON.parse(data);
      } else {
         return data;
      }
   }

   static setItem(name, data, asJSON = false) {
      if (asJSON) {
         localStorage.setItem(name, JSON.stringify(data))
      } else {
         localStorage.setItem(name, data);
      }
   }
}

export default Local;