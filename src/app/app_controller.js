angular
  .module('appModule')
  .controller('AppController',
    ['$window', '$log', '$interval', '$timeout', AppController]);

function AppController($window, $log, $interval, $timeout) {
  $log.log('AppController');

  var self = this;

  self.liveSec = 0;
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

  self.onNoteChange = onNoteChange;
  self.onTagsChange = onTagsChange;

  self.createNote = createNote;

  init();
  return self;

  function createNote() {
    $log.log('createNote');

    var note = {
      id: 0,
      tags: [],
      data: '',
      date: (new Date).toLocaleString() + ' ' + (new Date).getSeconds()
    };

    self.notes.unshift(note);
  }

  function getNotes(tags) {
    $log.log('getNotes', tags);

    //!!get from db

    self.notes = [];

    var tagList = tags.split(' ');

    for (var i = 0; i < self.dbNotes.length; i++) {
      var
        note = self.dbNotes[i],
        isMatched = true;

      for (var j = 0; j < note.tags.length; j++) {
        if (tagList.indexOf(note.tags[j]) === -1) {
          isMatched = false;
          break;
        }
      }

      if (isMatched) {
        self.notes.push(note);
      }
    }
  }

  function init() {
    $log.log('init');

    $interval(function() {
      self.liveSec++;
    }, 1000);

    $window.app = self;//!!

    self.tags = $window.localStorage.getItem('tags');

    if (self.tags) {
      search(self.tags);
    }
  }

  function onNoteChange(note) {
    $log.log('onNoteChange');

    saveNote(self.tags, note);
  }

  function onTagsChange() {
    $log.log('onTagsChange');

    search(self.tags);
  }

  function saveNote(tags, note) {

    function onSave() {
      $log.log('onSave');

      dbNote.id = 7;//!!on db
      dbNote.date = (new Date).toLocaleString() + ' ' + (new Date).getSeconds();

      note.id = dbNote.id;
      note.tags = dbNote.tags;
      note.date = dbNote.date;
      note.inProgres = false;

      self.dbNotes.unshift(note);

      if (dbNote.data !== note.data) {
        saveNote(tags, note);
      }
    }

    $log.log('saveNote', tags, note);

    if (note.inProgres) {
      return;
    }

    note.inProgres = true;

    $log.log('saveNote to db', tags, note);

    var dbNote = {};//!!delete
    angular.copy(note, dbNote);
    dbNote.tags = [];
    dbNote.tags.push(tags);//!!onli one tag

    $timeout(onSave, 5000);
  }

  function search(tags) {
    $log.log('search', tags);

    tags = tags.trim();

    $window.localStorage.setItem('tags', self.tags);

    getNotes(tags);
  }
}