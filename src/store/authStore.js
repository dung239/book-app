import { action, observable } from "mobx";

//observable defines a trackable field that stores the state.
//action marks a method as action that will modify the state.

export class AuthStore {
    // @observable auth;
  

    // @actionrr
    saveAuth(auth) {
        this.auth = auth;
    }

    // @action
    // reset() {
    //     this.auth = undefined;
       
    // }
}