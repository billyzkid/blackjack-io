import './index.scss';
import $ from 'jquery';
import io from 'socket.io-client';

const socket = io();

$('body').css('background-color', 'blue');
