/// <reference path="../_all.ts" />

namespace ContactManagerApp {
  
  export class ContactPanelController {
    user: User;
    actions = [
      {name: 'Phone', icon: 'phone'},
      {name: 'Twitter', icon: 'twitter'},
      {name: 'Google+', icon: 'google_plus'},
      {name: 'Hangouts', icon: 'hangouts'}
    ];
    
    static $inject = ['userService', '$mdBottomSheet'];
    
    constructor(
      private userService: IUserService,
      private $mdBottomSheet: angular.material.IBottomSheetService
    ) {
      this.user = userService.selectedUser;
    }
    
    submitContact(action): void {
      this.$mdBottomSheet.hide(action);
    }
  }
  
}
