import { Platform } from 'react-native';
import { observable, action, toJS } from 'mobx';

export default class LoginStore {

    @observable socialLogin: Boolean = false
    @observable firstName: String = ''
    @observable lastName: String = ''
    @observable username: String = ''
    @observable email: String = ''
    @observable password: String = ''
    @observable photoUrl: String = ''
    @observable showLoader = false
    @observable userInfo: Object = {};
  
    async clearLoginStore() {
      this.email = ''
      this.password = ''
      this.socialLogin = false
      this.firstName = ''
      this.lastName = ''
      this.username = ''
      this.photoUrl = ''
    }

    @action toggleLoader(status) {
        this.showLoader = status;
      }
  
    @action setEmail(email) {
      this.email = email;
    }
  
    @action setPassword(password) {
      this.password = password;
    }
  }
  