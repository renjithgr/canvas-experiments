export const setupCanvas = (elementId: string) => {
    const canvas: HTMLCanvasElement = document.getElementById(elementId) as HTMLCanvasElement;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    if(!context) {
        throw Error('Canvas context not available');
    }

    return { canvasElement: canvas, context, width, height };
}