/// <reference path="_all.ts" />

namespace ContactManagerApp {
  const URL_AVATAR_ICONS = './assets/svg/avatars.svg';
  const URL_ICON_MENU = './assets/svg/menu.svg';
  const URL_ICON_SHARE = './assets/svg/share.svg';
  
  angular.module('contactManagerApp', [
    'ngMaterial', 
    'ngMdIcons',
    'ngMessages'
  ])
    .service('userService', UserService)
    
    .controller('mainController', MainController)
    
    .config(($mdThemingProvider: angular.material.IThemingProvider) => {
      $mdThemingProvider.theme('default')         
        .primaryPalette('blue')
        .accentPalette('red');
    })
    
    .config(($mdIconProvider: angular.material.IIconProvider) => {
      $mdIconProvider
        .defaultIconSet(URL_AVATAR_ICONS, 128)
        
        .icon('menu', URL_ICON_MENU, 24)
        .icon('share', URL_ICON_SHARE, 24)
        
        .icon('phone', './assets/svg/phone.svg', 512)
        .icon('google_plus', './assets/svg/google_plus.svg', 512)
        .icon('hangouts', './assets/svg/hangouts.svg', 512)
        .icon('twitter', './assets/svg/twitter.svg', 512);
    });

}
