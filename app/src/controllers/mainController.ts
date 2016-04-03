/// <reference path="../_all.ts" />

namespace ContactManagerApp {
  
  export class MainController {
    users: User[] = [];
    selectedUser: User = null;
    searchText: string = '';
    tabIndex: number = 0;
    mdFabSpeedDialIsOpen = true;
    newNote: Note = new Note('', new Date());
    
    static $inject = [
      'userService', 
      '$mdSidenav',
      '$mdToast',
      '$mdDialog',
      '$mdMedia',
      '$mdBottomSheet'
    ];
    
    constructor(
      private userService: IUserService,
      private $mdSidenav: angular.material.ISidenavService,
      private $mdToast: angular.material.IToastService,
      private $mdDialog: angular.material.IDialogService,
      private $mdMedia: angular.material.IMedia,
      private $mdBottomSheet: angular.material.IBottomSheetService
    ) {
      let self = this;
      
      this.userService.loadAllUsers()
        .then((users: User[]) => {
          // console.log(self.users);  
          self.users = users;
          self.selectedUser = self.users[0];
          self.userService.selectedUser = self.selectedUser;
        });
    }
    
    // 側欄折疊面板開／合切換
    toggleSideNav(): void {
      this.$mdSidenav('left').toggle();
    }
    
    // 在側欄折疊面板選擇聯絡人
    // 內容顯示面板須與此處的選項「同步」
    selectUser(user: User): void {
      this.selectedUser = user;
      this.userService.selectedUser = this.selectedUser;
      
      if (this.$mdSidenav('left').isOpen()) {
        this.$mdSidenav('left').close();
      }
      
      this.tabIndex = 0;
    }
    
    showContactOptions($event): void {
      this.$mdBottomSheet.show({
        parent: angular.element(document.getElementById('wrapper')),
        templateUrl: './views/contactSheet.tpl.html',
        controller: ContactPanelController,
        controllerAs: 'cp',
        bindToController: true,
        targetEvent: $event
      })
        .then((clickedItem) => {
          if (clickedItem) {
            console.log(`${clickedItem.name} clicked!`);
          }
        });
    }
    
    // 使用者可自側欄的「新增」按鈕，添加新的「聯絡人」
    addContact($event): void {
      let self= this;
      let useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs')); 
      
      this.$mdDialog.show({
        templateUrl: './views/newContactDialog.tpl.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        controller: AddContactDialogController,
        controllerAs: 'ctrl',
        clickOutsideToClose: true,
        fullscreen: useFullScreen
      })
        .then((newContact: Contact) => {
          let newUser: User = User.createContact(newContact);
          self.users.push(newUser);
          self.openToast('New contact added');
        }, () => {
          console.log('You cancelled the dialog.');
        });
    }
    
    formScope: any;
    
    setFormScope(scope): void {
      this.formScope = scope;
    }
    
    addNote(): void {
      this.selectedUser.notes.push(this.newNote);
      
      // reset the form
      this.formScope.newNoteForm.$setUntouched();
      this.formScope.newNoteForm.$setPristine();
      
      this.newNote = new Note('', new Date());
      this.openToast('A new note added!');
    }
    
    removeNote(note: Note): void {
      let foundIndex = this.selectedUser.notes.indexOf(note);
      this.selectedUser.notes.splice(foundIndex, 1);
      
      this.openToast('Note has been removed!');
    }
    
    clearNotes($event): void {
      let confirm = this.$mdDialog.confirm()
        .title('Are you sure to delete all notes?')
        .textContent('All notes will be deleted, you can\' undo this action.')
        .targetEvent($event)
        .cancel('No')
        .ok('Yes');
        
      let self = this;
      this.$mdDialog.show(confirm)
        .then(() => {
          self.selectedUser.notes = [];
          self.openToast('All notes are cleared');
        });
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
