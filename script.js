const socket = new WebSocket('ws://YOUR_WEBSOCKET_SERVER_ADDRESS');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        const videoElement = document.createElement('video');
        document.body.appendChild(videoElement);
        videoElement.srcObject = stream;
        videoElement.play();

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        setInterval(function() {
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(function(blob) {
                socket.send(blob);
            }, 'image/jpeg');
        }, 1000); // Adjust the interval as needed
    })
    .catch(function(err) {
        console.error("An error occurred: " + err);
    });
