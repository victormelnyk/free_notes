angular
  .module('appModule')
  .controller('AppController',
    ['$window', '$log', '$resource', '$interval', '$timeout', AppController]);

function AppController($window, $log, $resource, $interval, $timeout) {
  $log.debug('AppController');

  var
    self = this,
    dbNotes = $resource('http://flit.pro:8080/notes', {
      tags: 'tag1'
    }, {

    });

  self.dbNotes = [{
    id: 1,
    tags: ['tag1'],
    data: 'note1',
    date: (new Date).toLocaleString()
  }, {
    id: 2,
    tags: ['tag1', 'tag2'],
    data: 'note2',
    date: (new Date).toLocaleString()
  }, {
    id: 3,
    tags: ['tag1'],
    data: 'note3',
    date: (new Date).toLocaleString()
  }];

  self.tags = '';
  self.notes = [];
  self.status = '';

  self.onNoteChange = onNoteChange;
  self.onTagsChange = onTagsChange;

  self.createNote = createNote;

  init();
  return self;

  function createNote() {
    $log.debug('createNote');

    var note = {
      id: 0,
      tags: [],
      data: '',
      date: ''
    };

    self.notes.unshift(note);
  }

  function getNotes(tags) {
    $log.debug('getNotes', tags);

    self.status = 'Updating...';

    self.notes = dbNotes.query(function() {
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

      dbNote.id = 7;//!!on db
      dbNote.date = (new Date).toLocaleString();

      note.id = dbNote.id;
      note.tags = dbNote.tags;
      note.date = dbNote.date;
      note.inProgres = false;

      self.dbNotes.unshift(note);

      if (dbNote.data !== note.data) {
        saveNote(tags, note);
      }

      self.status = 'All notes saved';
    }

    $log.debug('saveNote', tags, note);

    self.status = 'Saving...';

    if (note.inProgres) {
      return;
    }

    note.inProgres = true;

    $log.debug('saveNote to db', tags, note);

    var dbNote = {};//!!delete
    angular.copy(note, dbNote);
    dbNote.tags = [];
    dbNote.tags.push(tags);//!!onli one tag

    $timeout(onSave, 5000);
  }

  function search(tags) {
    $log.debug('search', tags);

    $window.localStorage.setItem('tags', tags);

    getNotes(tags);
  }
}