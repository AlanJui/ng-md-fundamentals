/// <reference path="../_all.ts" />

namespace ContactManagerApp {
  
  export class MainController {
    users: User[] = [];
    message: string = 'Hello from our MainController';
    
    static $inject = ['userService', '$mdSidenav'];
    
    constructor(
      private userService: IUserService,
      private $mdSidenav: angular.material.ISidenavService
    ) {
      let self = this;
      
      userService.loadAllUsers()
        .then((users: User[]) => {
          self.users = users;
          console.log(self.users);  
        });
    }
    
    toggleSideNav(): void {
      this.$mdSidenav('left').toggle();
    }
  }
  
}
