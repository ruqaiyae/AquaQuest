/* exported data */
interface Data {
  view: string;
  logs: DiveLog[];
  editing: null | DiveLog;
  nextEntryId: number;
}

const data: Data = readData();

function writeData(): void {
  const dataJSON = JSON.stringify(data);

  localStorage.setItem('dataJSON', dataJSON);
}

function readData(): Data {
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
