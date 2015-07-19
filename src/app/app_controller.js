angular
  .module('appModule')
  .controller('AppController',
    ['$window', '$log', '$interval', AppController]);

function AppController($window, $log, $interval) {
  $log.log('AppController');

  var self = this;

  self.liveSec = 0;

  self.tags = '';

  self.notes = [{
    data: 'note1',
    date: '01.02.1215'
  }, {
    data: 'note1',
    date: '01.02.1215'
  }];

  self.ni = ni;

  init();
  return self;

  function init() {
    $interval(function() {
      self.liveSec++;
    }, 1000);

    $window.$.material.init();
    $window.app = self;
  }

  function ni() {
    $log.error('Not Implemented');
  }
}