/// <reference path="_all.ts" />

namespace ContactManagerApp {
  
  angular.module('contactManagerApp', ['ngMaterial'])
    .service('userService', UserService)
    .controller('mainController', MainController);

}
