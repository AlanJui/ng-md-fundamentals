/// <reference path="../_all.ts" />

namespace ContactManagerApp {
  
  export class MainController {
    users: User[] = [];
    selectedUser: User = null;
    searchText: string = '';
    tabIndex: number = 0;
    message: string = 'Hello from our MainController';
    
    static $inject = [
      'userService', 
      '$mdSidenav',
      '$mdToast'
    ];
    
    constructor(
      private userService: IUserService,
      private $mdSidenav: angular.material.ISidenavService,
      private $mdToast: angular.material.IToastService
    ) {
      let self = this;
      
      userService.loadAllUsers()
        .then((users: User[]) => {
          // console.log(self.users);  
          self.users = users;
          self.selectedUser = self.users[0];
        });
    }
    
    toggleSideNav(): void {
      this.$mdSidenav('left').toggle();
    }
    
    selectUser(user: User): void {
      this.selectedUser = user;
      
      if (this.$mdSidenav('left').isOpen()) {
        this.$mdSidenav('left').close();
      }
      
      this.tabIndex = 0;
    }
    
    removeNote(note: Note): void {
      let foundIndex = this.selectedUser.notes.indexOf(note);
      this.selectedUser.notes.splice(foundIndex, 1);
      
      this.openToast('Note has been removed!');
    }
    
    openToast(message: string): void {
      this.$mdToast.show(
        this.$mdToast.simple()
          .position('top right')
          .textContent(message)
          .hideDelay(3000)
      );
    }
  }
  
}
