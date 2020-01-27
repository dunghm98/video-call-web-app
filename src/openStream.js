const playvideo = require('./playvideo');

function openStream(){
    navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({  audio: false, video: true })
            .then(function (stream) {
                console.log(stream)
                playvideo(stream,'localStream');
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