// Ionic Starter App

angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('your_app_name', [
  'ionic',
  'angularMoment',
  'your_app_name.controllers',
  'your_app_name.directives',
  'your_app_name.filters',
  'your_app_name.services',
  'your_app_name.factories',
  'your_app_name.config',
  'your_app_name.views',
  'underscore',
  'ngResource',
  'ngCordova',
  'slugifier'
])

.run(function($ionicPlatform, $rootScope, $ionicConfig, $timeout) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    if (navigator && navigator.splashscreen) {
      navigator.splashscreen.show();
    }
  });
 

  // This fixes transitions for transparent background views
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if(toState.name.indexOf('auth.walkthrough') > -1)
    {
      // set transitions to android to avoid weird visual effect in the walkthrough transitions
      $timeout(function(){
        $ionicConfig.views.transition('android');
        $ionicConfig.views.swipeBackEnabled(false);
      	console.log("setting transition to android and disabling swipe back");
      }, 0);
    }
  });
  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
    if(toState.name.indexOf('app.feeds-categories') > -1)
    {
      // Restore platform default transition. We are just hardcoding android transitions to auth views.
      $ionicConfig.views.transition('platform');
      // If it's ios, then enable swipe back again
      if(ionic.Platform.isIOS())
      {
        $ionicConfig.views.swipeBackEnabled(true);
      }
    	console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());
    }
  });
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider

  .state('auth.login', {
    url: '/login',
    templateUrl: "views/auth/login.html",
    controller: 'LoginCtrl'
  })

  .state('auth.signup', {
    url: '/signup',
    templateUrl: "views/auth/signup.html",
    controller: 'SignupCtrl'
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "views/app/side-menu.html",
    controller: 'AppCtrl'
  })

  //MISCELLANEOUS
  .state('app.miscellaneous', {
    url: "/miscellaneous",
    views: {
      'menuContent': {
        templateUrl: "views/app/miscellaneous/miscellaneous.html"
      }
    }
  })

  //LAYOUTS
  .state('app.layouts', {
    url: "/layouts",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/layouts.html"
      }
    }
  })

  .state('app.slider', {
    url: "/layouts/slider",
    views: {
      'menuContent': {
        templateUrl: "views/app/layouts/slider.html"
      }
    }
  })

  //FEEDS
  .state('app.feeds-categories', {
    url: "/feeds-categories",
    views: {
      'menuContent': {
        templateUrl: "views/app/feeds/feeds-categories.html",
        controller: 'FeedsCategoriesCtrl'
      }
    }
  })

  .state('app.category-feeds', {
    url: "/category-feeds/:categoryId/:categoryName",
    views: {
      'menuContent': {
        templateUrl: "views/app/feeds/category-feeds.html",
        controller: 'CategoryFeedsCtrl'
      }
    }
  })

  .state('app.feed-entries', {
    url: "/feed-entries/:categoryId/:sourceId/:telaColunista",
    views: {
      'menuContent': {
        templateUrl: "views/app/feeds/feed-entries.html",
        controller: 'FeedEntriesCtrl'
      }
    }
  })

  //WORDPRESS
  .state('app.wordpress', {
    url: "/wordpress/:categoryId",
    views: {
      'menuContent': {
        templateUrl: "views/app/wordpress/wordpress.html",
        controller: 'WordpressCtrl'
      }
    }
  })

  .state('app.post', {
    url: "/wordpress/:postId",
    views: {
      'menuContent': {
        templateUrl: "views/app/wordpress/wordpress_post.html",
        controller: 'WordpressPostCtrl'
      }
    },
    resolve: {
      post_data: function(PostService, $ionicLoading, $stateParams) {
        $ionicLoading.show({
      		template: 'Carregando ...'
      	});

        var postId = $stateParams.postId;
        return PostService.getPost(postId);
      }
    }
  })

  .state('app.forms', {
    url: "/forms",
    views: {
      'menuContent': {
        templateUrl: "views/app/forms.html"
      }
    }
  })

  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "views/app/profile.html",
        controller: "ProfileCtrl"
      }
    }
  })

  .state('app.bookmarks', {
    url: "/bookmarks",
    views: {
      'menuContent': {
        templateUrl: "views/app/bookmarks.html",
        controller: 'BookMarksCtrl'
      }
    }
  })

  .state('app.contacts', {
    url: "/contacts",
    views: {
      'menuContent': {
        templateUrl: "views/app/contacts.html",
        controller: 'ContactsCtrl'
      }
    }
  })

  .state('app.anuncie', {
    url: "/anuncie",
    views: {
      'menuContent': {
        templateUrl: "views/app/anuncie.html",
        controller: 'AnuncieCtrl'
      }
    }
  })

  .state('app.colunistas', {
    url: "/colunistas",
    views: {
      'menuContent': {
        templateUrl: "views/app/colunistas.html",
        controller: 'ColunistasCtrl'
      }
    }
  })

  .state('app.areaRestrita', {
    url: "/areaRestrita",
    views: {
      'menuContent': {
        controller: 'AreaRestritaCtrl'
      }
    }
  })

  .state('app.multimidia', {
    url: "/multimidia",
    views: {
      'menuContent': {
        templateUrl: "views/app/multimidia.html",
        controller: 'MultimidiaCtrl'
      }
    }
  })

  .state('app.parceiros', {
    url: "/parceiros",
    views: {
      'menuContent': {
        templateUrl: "views/app/parceiros.html",
        controller: 'ParceirosCtrl'
      }
    }
  })



;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/feeds-categories');
});
