import './index.scss';
import $ from 'jquery';
import io from 'socket.io-client';

const TABLE_ID_LENGTH = 6;

const socket = io();
const tableId = getTableId();

if (tableId) {
  $('#join-table-button').show();
} else {
  $('#create-table-button').show();
}

$('#welcome-container').show();

$('#join-table-button').on('click', (e) => {
  socket.emit('join table', { tableId });
});

$('#create-table-button').on('click', (e) => {
  socket.emit('create table', {});
});

socket.on('join table', message => {
  $('#welcome-container').hide();
  $('#table-container').show();
});

socket.on('create table', message => {
  window.history.pushState(null, '', '/' + message.tableId);
  $('#welcome-container').hide();
  $('#table-container').show();
});

function getTableId() {
  const href = window.location.href;

  if (href.length - 1 > window.origin.length) {
    return href.substring(href.length - TABLE_ID_LENGTH);
  } else {
    return null;
  }
}
