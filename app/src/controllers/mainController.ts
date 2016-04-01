/// <reference path="../_all.ts" />

namespace ContactManagerApp {
  
  export class MainController {
    users: User[] = [];
    message: string = 'Hello from our MainController';
    
    static $inject = ['userService'];
    
    constructor(private userService: IUserService) {
      let self = this;
      
      userService.loadAllUsers()
        .then((users: User[]) => {
          self.users = users;
          console.log(self.users);  
        });
    }
  }
  
}
