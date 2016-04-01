/// <reference path="_all.ts" />

namespace ContactManagerApp {
  
  angular.module('contactManagerApp', ['ngMaterial', 'ngMdIcons'])
    .service('userService', UserService)
    .controller('mainController', MainController);

}
