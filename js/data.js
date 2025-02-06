'use strict';
const data = readData();
function writeData() {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('dataJSON', dataJSON);
}
function readData() {
  const stringJSON = localStorage.getItem('dataJSON');
  if (stringJSON) {
    return JSON.parse(stringJSON);
  }
  return {
    view: 'entry-form',
    logs: [],
    editing: null,
    nextEntryId: 1,
  };
}
