import LoginStore from './LoginStore';

class Store {
    loginStore: LoginStore;
  
    constructor() {
      this.loginStore = new LoginStore(this);
    }
  }
  
  export default new Store();