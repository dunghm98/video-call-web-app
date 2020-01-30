function openStream(callback){
    navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({  audio: false, video: true })
            .then( stream => {
                callback(stream);
                
            })
            .catch(function (e) { console.log(e.name + ": " + e.message); });
    }
    else {
        navigator.getWebcam({ audio: false, video: true },
            stream => {
                callback(stream);
            },
             () => console.log("Web cam is not accessible."));
    }
}

module.exports = openStream;