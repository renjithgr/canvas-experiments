import { setupCanvas } from './utils/utils';

const { canvasElement, context, width, height } = setupCanvas('canvas');

canvasElement.addEventListener('mousemove', (event) => {
  // renderCoordinates(event.clientX, event.clientY);
})

const getPhysicalX = (logicalX: number) => {
  return width/2 + logicalX;
};

const pattern = [false, true, false];
const centerX = width / 2;
const centerY = height / 2;
const amplitude = 20;

const animate = () => {
  // requestAnimationFrame(animate);
  context.moveTo(centerX, centerY);
  context.lineWidth = 2;
  let lastCoordinates = { x: centerX, y: centerY };
  pattern.forEach((value, index) => {
    if(index !== 0 && value === pattern[index - 1]) {
      lastCoordinates = drawPersistEdge(context, lastCoordinates.x, lastCoordinates.y, 20);
    }
    else if(value === true) {
      lastCoordinates = drawRaisingEdge(context, lastCoordinates.x, lastCoordinates.y, 20, 20);
    } else if(value === false) {
      lastCoordinates = drawFallingEdge(context, lastCoordinates.x, lastCoordinates.y, 20, 20);
    }
    
  });
};


const drawPersistEdge = (context: CanvasRenderingContext2D, startX: number, startY: number, pulseWidth:number) => {
  context.lineTo(startX + pulseWidth, startY);
  context.stroke();

  return { x: startX + pulseWidth, y: startY };
};

const drawFallingEdge = (context: CanvasRenderingContext2D, startX: number, startY: number, pulseHeight: number, pulseWidth:number) => {
  context.lineTo(startX, startY + pulseHeight);
  context.stroke();
  context.lineTo(startX + pulseWidth, startY + pulseHeight);
  context.stroke();

  return { x: startX + pulseWidth, y: startY + pulseHeight };
};

const drawRaisingEdge = (context: CanvasRenderingContext2D, startX: number, startY: number, pulseHeight: number, pulseWidth:number) => {
  context.lineTo(startX, startY - pulseHeight);
  context.stroke();
  context.lineTo(startX + pulseWidth, startY - pulseHeight);
  context.stroke();

  return { x: startX + pulseWidth, y: startY - pulseHeight };
};

animate();