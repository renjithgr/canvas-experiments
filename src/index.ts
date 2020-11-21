import * as dat from 'dat.gui';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = innerWidth;
canvas.height = innerHeight;
const context = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

const wave = { y: height / 2, length: 0.01, amplitude: 100, frequency: 0.01 };
const strokeColor = { hue: 200, sat: 50, lum: 50 };
const backgroundColor = { r: 255, g: 255, b: 255, a: 0.02 };

const controls = new dat.GUI();

const waveFolder = controls.addFolder('wave');
waveFolder.add(wave, 'y', 0, height);
waveFolder.add(wave, 'length', -0.01, 0.01);
waveFolder.add(wave, 'amplitude', -300, 300);
waveFolder.add(wave, 'frequency', -0.1, 0.1);
waveFolder.open();

const lineColorFolder = controls.addFolder('line color');
lineColorFolder.add(strokeColor, 'hue', 0, 255);
lineColorFolder.add(strokeColor, 'sat', 0, 100);
lineColorFolder.add(strokeColor, 'lum', 0, 100);
lineColorFolder.open();

const backgroundColorFolder = controls.addFolder('background');
backgroundColorFolder.add(backgroundColor, 'r', 0, 255);
backgroundColorFolder.add(backgroundColor, 'g', 0, 255);
backgroundColorFolder.add(backgroundColor, 'b', 0, 255);
backgroundColorFolder.add(backgroundColor, 'a', 0, 1);
backgroundColorFolder.open();

let increment = wave.frequency;

const animate = () => {
  requestAnimationFrame(animate);

  if(context) {
    const { r, g, b, a } = backgroundColor;
    context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height/2);
  
    for(let i=0; i < canvas.width; i++) {
      let y = wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment);
      context.lineTo(i, y);  
    }
    
    increment += wave.frequency;

    context.moveTo(0, height/2);
    const { hue, sat, lum } = strokeColor;
    const newHue = Math.abs(Math.sin(increment) * hue);
    context.strokeStyle = `hsl(${newHue}, ${strokeColor.sat}%, ${strokeColor.lum}%)`;
    context.stroke();
  }
};

animate();