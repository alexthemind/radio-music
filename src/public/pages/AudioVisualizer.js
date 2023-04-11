import { useEffect } from 'react';
import '../css/audio-visualizer.css';

let globalWith = 300;
let globalHeight = 142;

const AudioVisualizer = (audio) => {

    useEffect(() => {
        var context = new AudioContext();
            //context.resume();
        var src = context.createMediaElementSource(audio);
        var analyser = context.createAnalyser();

        var canvas = document.getElementById("canvas");
        canvas.width = globalWith;
        canvas.height = globalHeight;
        var ctx = canvas.getContext("2d");

        src.connect(analyser);
        analyser.connect(context.destination);

        analyser.fftSize = 256;

        var bufferLength = analyser.frequencyBinCount;
        console.log('buffered length:',bufferLength);

        var dataArray = new Uint8Array(bufferLength);

        var WIDTH = globalWith;
        var HEIGHT = globalHeight;

        var barWidth = (WIDTH / bufferLength) * 4;
        var barHeight;
        var x = 0;

        function renderFrame() {
            requestAnimationFrame(renderFrame);

            x = 0;

            analyser.getByteFrequencyData(dataArray);

            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            for (var i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];
                
                var r = barHeight + (5 * (i/bufferLength));
                var g = 250 * (i/bufferLength);
                var b = 50;

                ctx.fillStyle = "rgb(204, 209, 209)";
                ctx.fillRect(x, HEIGHT - barHeight + 100, barWidth, barHeight);

                x += barWidth + 1;
            }
        }
        
        renderFrame();
    },[]);

    return (
        <canvas id="canvas" style={{ marginLeft: '1em' }}></canvas>
    );

}

export default AudioVisualizer