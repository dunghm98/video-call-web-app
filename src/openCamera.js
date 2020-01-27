function openCamera(){
    navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({  audio: false, video: true })
            .then(function (stream) {
                console.log(stream)
                const video = document.getElementById('localStream') ;
                video.srcObject =stream;
                video.onloadeddata = function () {
                    video.play();
                }
            })
            .catch(function (e) { console.log(e.name + ": " + e.message); });
    }
    else {
        navigator.getWebcam({ audio: true, video: true },
            function (stream) {
                const video = document.getElementById('localStream') ;
                video.srcObject =stream;
                video.onloadeddata = function () {
                    video.play();
                }
            },
            function () { console.log("Web cam is not accessible."); });
    }
}

module.exports = openCamera;