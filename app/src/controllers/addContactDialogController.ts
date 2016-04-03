/// <reference path="../_all.ts" />

namespace ContactManagerApp {
  
  export class AddContactDialogController {
    newContact: Contact;
    avatars = [
      'svg-1', 
      'svg-2', 
      'svg-3', 
      'svg-4'
    ];
    
    static $inject = ['$mdDialog'];
    
    constructor(private $mdDialog) {}
    
    cancel(): void {
      this.$mdDialog.cancel();
    }
    
    save(): void {
      this.$mdDialog
        .hide(this.newContact);
    }
  }
  
}
