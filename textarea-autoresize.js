angular.module('textareaAutoresize', []).service('textareaAutoresize', textareaAutoresize);
textareaAutoresize.$inject = ['$window'];
function textareaAutoresize($window) {
  return {
    restrict: 'A',
    scope: {
      ngModel: '=',
      minimumHeight: '='
    },
    link: function(scope, element, attrs) {
      if(!scope.minimumHeight) {
        scope.minimumHeight = 40;
      }
      
      element.css({
        overflowY: 'hidden',
        resize: 'none'
      });
      
      // Update when the model changes because more lines = more height
      scope.$watch('ngModel', function() {
        updateHeight();
      });
      
      // Update when the visibility changes because invisible often means scrollHeight = 0
      scope.$watch(function() {
        return element.is(":visible");
      }, function() {
        updateHeight();
      });
      
      // Update when the window resizes because less witdh might = more lines
      angular.element($window).on('resize', updateHeight);
      scope.$on('$destroy', cleanup);
      
      function updateHeight() {
        // Changing the height to auto then to a value makes sure the resize always happens.
        // If we do not use auto, the resize does not always happen.
        element.height('auto');
        // Using Math.max allows us to set a minimum height.
        // The scrollHeight property tells us the actual height of the element.
        element.height(Math.max(element[0].scrollHeight, scope.minimumHeight) + 'px');
      }
      
      function cleanup() {
        angular.element($window).off('resize', updateHeight);
      }
    }
  };
}