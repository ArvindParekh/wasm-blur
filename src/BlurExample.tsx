import React, { useRef, useEffect, useState } from 'react';

interface BlurWasm {
  blur: (data: Uint8Array, width: number, height: number, radius: number) => void;
}

const BlurExample: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wasm, setWasm] = useState<BlurWasm | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWasm = async () => {
      try {
        // import and init the wasm module
        const wasmModule = await import('../pkg/blur_wasm');
        await wasmModule.default();
        
        setWasm(wasmModule);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load WASM module:', error);
        setIsLoading(false);
      }
    };

    loadWasm();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !wasm) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;

        // Draw original image
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const data = new Uint8Array(imageData.data);

        // Apply blur using WASM
        wasm.blur(data, img.width, img.height, 5);

        // Put blurred data back to canvas
        const newImageData = new ImageData(new Uint8ClampedArray(data), img.width, img.height);
        ctx.putImageData(newImageData, 0, 0);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  if (isLoading) {
    return <div>Loading WASM module...</div>;
  }

  if (!wasm) {
    return <div>Failed to load WASM module</div>;
  }

  return (
    <div>
      <h2>WASM Blur Example</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <br />
      <canvas ref={canvasRef} style={{ border: '1px solid #ccc', marginTop: '10px' }} />
    </div>
  );
};

export default BlurExample; 