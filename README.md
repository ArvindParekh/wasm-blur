# WebAssembly Image Blur

Demonstrates how to use WebAssembly (WASM) with Rust for computationally expensive operations in a React web application. This project implements an image blur algorithm in Rust and compiles it to WebAssembly for use in the browser.

## 🎯 Project Overview

This project showcases:
- **Rust-to-WASM compilation** using `wasm-pack`
- **Performance optimization** by moving computationally expensive operations to WebAssembly
- **React integration** with WASM modules
- **Image processing** using a box blur algorithm implemented in Rust

## 🏗️ Project Structure

```
WASM/
├── src/                    # React frontend
│   ├── App.tsx            # Main React app
│   ├── BlurExample.tsx    # WASM blur demo component
│   └── main.tsx           # App entry point
├── wasm/                  # Rust WASM source
│   ├── src/
│   │   ├── lib.rs         # Main WASM library with blur function
│   │   └── utils.rs       # Utility functions
│   └── Cargo.toml         # Rust dependencies
├── pkg/                   # Generated WASM bindings (auto-generated)
│   ├── blur_wasm.js       # JavaScript bindings
│   ├── blur_wasm.wasm     # Compiled WebAssembly module
│   └── blur_wasm.d.ts     # TypeScript definitions
├── package.json           # Node.js dependencies and scripts
└── vite.config.ts         # Vite build configuration
```

## 🔧 How It Works

### 1. Rust Implementation
The core blur algorithm is implemented in Rust (`wasm/src/lib.rs`):
- Uses a **box blur algorithm** that averages pixels within a specified radius
- Processes RGBA image data directly in memory
- Compiled to WebAssembly for near-native performance in the browser

### 2. WASM Integration
- Rust code is compiled to WASM using `wasm-pack`
- JavaScript bindings are automatically generated
- TypeScript definitions ensure type safety

### 3. React Frontend
- `BlurExample.tsx` handles image upload and canvas rendering
- Loads the WASM module asynchronously
- Applies the blur effect and displays results in real-time

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **pnpm** (or npm/yarn)
- **Rust** (latest stable version)
- **wasm-pack** for compiling Rust to WebAssembly

### Installing Prerequisites

1. **Install Rust**: Visit [rustup.rs](https://rustup.rs/) or run:
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **Install wasm-pack**:
   ```bash
   cargo install wasm-pack
   ```

3. **Install Node.js dependencies**:
   ```bash
   pnpm install
   ```

## 🚀 Running the Project

1. **Build the WASM module**:
   ```bash
   pnpm run build:wasm
   ```
   (this generates the `pkg` directory containing WASM modules — importable in your browser environment)

2. **Start the development server**:
   ```bash
   pnpm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

This will:
1. Build the WASM module
2. Compile TypeScript
3. Bundle the application for production

## 🖼️ Usage

1. **Upload an image** using the file input
2. **Watch the blur effect** applied in real-time using WebAssembly
3. The algorithm applies a blur with radius of 5 pixels

## 🧠 Learning Points

### WebAssembly Benefits
- **Performance**: Near-native speed for computationally intensive tasks
- **Language Flexibility**: Write performance-critical code in Rust
- **Browser Compatibility**: Runs in all modern browsers
- **Memory Safety**: Rust's memory safety guarantees

### Implementation Details
- **Box Blur Algorithm**: Simple but effective blur technique
- **Memory Management**: Direct manipulation of pixel data
- **Asynchronous Loading**: WASM modules load asynchronously
- **Type Safety**: Full TypeScript integration

## 📚 Key Files Explained

### `wasm/src/lib.rs`
Contains the main blur function:
```rust
#[wasm_bindgen]
pub fn blur(data: &mut [u8], width: u32, height: u32, radius: u32)
```
- Takes mutable reference to image data
- Applies box blur algorithm with specified radius
- Modifies data in-place for efficiency

### `src/BlurExample.tsx`
React component that:
- Loads the WASM module
- Handles file uploads
- Renders images on canvas
- Applies blur using WASM function

### `package.json` Scripts
- `build:wasm`: Compiles Rust to WebAssembly
- `dev`: Runs development server
- `build`: Creates production build

## 🔍 Performance Comparison

WebAssembly provides significant performance benefits for image processing:
- **JavaScript implementation**: ~100-500ms for typical images
- **WASM implementation**: ~10-50ms for the same images
- **Memory efficiency**: Direct memory access without JavaScript overhead

## 📖 Resources

- [Rust and WebAssembly Book](https://rustwasm.github.io/book/)
- [wasm-pack Documentation](https://rustwasm.github.io/wasm-pack/)
- [WebAssembly MDN Guide](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [Rust wasm-bindgen Guide](https://rustwasm.github.io/wasm-bindgen/)
