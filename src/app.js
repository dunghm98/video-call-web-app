const openStream = require('./openStream');
const Peer = require('simple-peer');
const $ = require('jquery');
const playvideo = require('./playVideo');

openStream(function(stream){
    playvideo(stream,'localStream');
    const p = new Peer({
        initiator: location.hash === '#1',
        trickle: false,
        stream:stream
    });
    p.on('signal', token => {
        $('#txtMySignal').val(JSON.stringify(token));
    });
    $('#btnConnect').click(() => {
        const friendSignal = JSON.parse($('#txtMyFriendSignal').val());
        p.signal(friendSignal);
    });
    p.on('stream', friendStream => playvideo(friendStream,'friendStream'));
});
