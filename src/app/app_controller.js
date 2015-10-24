angular
  .module('appModule')
  .controller('AppController',
    ['$window', '$log', '$resource', '$interval', '$timeout', AppController]);

function AppController($window, $log, $resource, $interval, $timeout) {
  $log.debug('AppController');

  var
    self = this,
    statusTypes = {
      enterTags: 'Enter tags',
      updating: 'Updating...',
      saving: 'Saving...',
      allSaved: 'All notes saved'
    },
    dbNote = $resource('http://localhost\\:8080/tags/:tags/notes/:id', {
      tags: '@tags',
      id: '@id'
    }, {
      insert: {
        method: 'POST',
        transformRequest: function(data, headersGetter) {
          return JSON.stringify({
            data: data.data || ''
          });
        }
      },
      update: {
        method: 'PUT',
        transformRequest: function(data, headersGetter) {
          return JSON.stringify({
            data: data.data
          });
        }
      }
    }),
    updateTimer = null;

  self.tags = '';
  self.notes = [];
  self.status = statusTypes.enterTags;

  self.onNoteChange = onNoteChange;
  self.onTagsChange = onTagsChange;

  self.createNote = createNote;
  self.deleteNote = deleteNote;

  init();
  return self;

  function createNote() {
    $log.debug('createNote');

    self.status = statusTypes.saving;

    var note = new dbNote({
      tags: self.tags
    });

    note.inProgres = true;

    note.$insert(function() {
      note.inProgres = false;
      self.status = statusTypes.allSaved;
    });

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

    if (!tags) {
      self.notes = [];
      self.status = statusTypes.enterTags;
      return;
    }

    self.status = statusTypes.updating;

    self.notes = dbNote.query({
      tags: tags
    }, function() {
      self.status = statusTypes.allSaved;
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

    function saveNoteToDb() {
      $log.debug('saveNote to db', tags, note);

      self.status = statusTypes.saving;

      note.$update({
        tags: tags
      }, function() {
        note.inProgres = false;
        self.status = statusTypes.allSaved;
      });
    }

    $log.debug('saveNote', tags, note);

    note.inProgres = true;

    $timeout.cancel(updateTimer);
    updateTimer = $timeout(saveNoteToDb, 1000);
  }

  function search(tags) {
    $log.debug('search', tags);

    $window.localStorage.setItem('tags', tags);

    getNotes(tags);
  }
}