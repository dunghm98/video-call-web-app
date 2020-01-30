const playvideo = require('./playVideo');
const Peer = require('simple-peer');
const $ = require('jquery');

function openStream(){
    navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({  audio: false, video: true })
            .then(function (stream) {
                console.log(stream);
                console.log('run');
                playvideo(stream,'localStream');
                const p = new Peer({
                    initiator: location.hash === '#1',
                    trickle: false,
                    stream:stream
                });
                p.on('signal', token => {
                    $('#txtMySignal').val(JSON.stringify(token));
                });
                p.on('stream', friendStream => playvideo(friendStream,'friendStream'));

                $('#btnConnect').click(() => {
                    const friendSignal = JSON.parse($('#txtMyFriendSignal').val());
                    p.signal(friendSignal);
                });
            })
            .catch(function (e) { console.log(e.name + ": " + e.message); });
    }
    else {
        navigator.getWebcam({ audio: true, video: true },
            function (stream) {
                playvideo(stream,'localStream');
            },
            function () { console.log("Web cam is not accessible."); });
    }
}

module.exports = openStream;