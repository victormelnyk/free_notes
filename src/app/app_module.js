angular.module('appModule', [
  'ngResource',
  'ngMaterial'
]);

angular.module('appModule').config(['$logProvider', function($logProvider) {
  $logProvider.debugEnabled(true);
}]);

angular.module('appModule').config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default').
    primaryPalette('blue').
    accentPalette('red');
});

angular.module('appModule').directive('contenteditable', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$render = function() {
        element.html(ngModel.$viewValue || '');
      };

      element.bind('blur keyup change', function() {
        scope.$apply(function() {
          ngModel.$setViewValue(element.html());
        });
      });
    }
  };
});