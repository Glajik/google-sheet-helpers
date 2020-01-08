/* globals SpreadsheetApp : true */

// import withSheet from './withSheet';

function uiSwitchTo(sheet, row) {
  withSheet(sheet).getRange(row || 1, 1).activate();
}

function uiSelect(row, sheet) {
  withSheet(sheet).getRange(row, 1).setValue(true);
}

function uiUnselect(row, sheet) {
  withSheet(sheet).getRange(row, 1).setValue(false);
}

function uiSelectMany(rowList, sheet) {
  function select(row) { uiSelect(row, sheet); }
  rowList.forEach(select);
}

function uiRemoveSelected(sheet) {
  function unselect(range) { range.setValue(false); }
  const sheet_ = withSheet(sheet);
  const last = sheet_.getLastRow();
  const a1Notation = 'A1:A'.concat(last);
  sheet_.getRange(a1Notation)
    .createTextFinder(true)
    .findAll()
    .forEach(unselect);
}

function uiDialogAccept(title, prompt) {
  const ui = SpreadsheetApp.getUi();
  const buttons = ui.ButtonSet.OK_CANCEL;
  const response = ui.alert(title, prompt, buttons);
  if (response === ui.Button.CANCEL) throw new Error('Действие отменено');
}

function uiDialogAsk(title, prompt) {
  const ui = SpreadsheetApp.getUi();
  const buttons = ui.ButtonSet.OK_CANCEL;
  const response = ui.prompt(title, prompt, buttons);
  if (response.getSelectedButton() === ui.Button.CANCEL) {
    throw new Error('Действие отменено');
  }
  return response.getResponseText().trim();
}

function uiToast(msg) {
  SpreadsheetApp.getActiveSpreadsheet().toast(msg);
}
