angular
  .module('appModule')
  .controller('AppController',
    ['$window', '$log', '$resource', '$interval', '$timeout', AppController]);

function AppController($window, $log, $resource, $interval, $timeout) {
  $log.debug('AppController');

  var
    self = this,
    dbNote = $resource('http://localhost\\:8080/tags/:tags/notes/:id', {
      tags: '@tags',
      id: '@id'
    }, {
      insert: {
        method: 'POST',
        params: {
          data: ''
        }
      },
      update: {
        method: 'PUT',
        params: {
          data: '@data'
        }
      }
    });

  self.tags = '';
  self.notes = [];
  self.status = '';

  self.onNoteChange = onNoteChange;
  self.onTagsChange = onTagsChange;

  self.createNote = createNote;
  self.deleteNote = deleteNote;

  init();
  return self;

  function createNote() {
    $log.debug('createNote');

    var note = new dbNote({
      tags: self.tags
    });

    note.$insert();

    self.notes.unshift(note);
  }

  function deleteNote(note) {
    $log.debug('deleteNote', note);

    note.$delete({
      tags: self.tags
    });

    self.notes.splice(self.notes.indexOf(note), 1);
  }

  function getNotes(tags) {
    $log.debug('getNotes', tags);

    self.status = 'Updating...';

    self.notes = dbNote.query({
      tags: tags
    }, function() {
      self.status = 'All notes saved';
    });
  }

  function init() {
    $log.debug('init');

    self.tags = $window.localStorage.getItem('tags');

    if (self.tags) {
      getNotes(self.tags);
    }
  }

  function onNoteChange(note) {
    $log.debug('onNoteChange');

    saveNote(self.tags, note);
  }

  function onTagsChange() {
    $log.debug('onTagsChange', self.tags);

    search(self.tags || '');
  }

  function saveNote(tags, note) {

    function onSave() {
      $log.debug('onSave');

      note.inProgres = false;

      /*if (dbNote.data !== note.data) {
        saveNote(tags, note);
      }*/

      self.status = 'All notes saved';
    }

    $log.debug('saveNote', tags, note);

    self.status = 'Saving...';

    /*if (note.inProgres) {
      return;
    }*/

    note.inProgres = true;

    $log.debug('saveNote to db', tags, note);

    note.$update({
      tags: tags
    });

    //$timeout(onSave, 5000);
  }

  function search(tags) {
    $log.debug('search', tags);

    $window.localStorage.setItem('tags', tags);

    getNotes(tags);
  }
}