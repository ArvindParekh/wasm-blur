mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn blur(data: &mut [u8], width: u32, height: u32, radius: u32) {
    let original = data.to_vec();
    
    for y in 0..height {
        for x in 0..width {
            let mut sum_r = 0;
            let mut sum_g = 0;
            let mut sum_b = 0;
            let mut sum_a = 0;
            let mut count = 0;

            for dy in -(radius as isize)..=(radius as isize) {
                for dx in -(radius as isize)..=(radius as isize) {
                    let nx = x as isize + dx;
                    let ny = y as isize + dy;

                    if nx >= 0 && nx < width as isize && ny >= 0 && ny < height as isize {
                        let pixel_index = (ny as usize * width as usize + nx as usize) * 4;
                        sum_r += original[pixel_index] as u32;     // Red
                        sum_g += original[pixel_index + 1] as u32; // Green
                        sum_b += original[pixel_index + 2] as u32; // Blue
                        sum_a += original[pixel_index + 3] as u32; // Alpha
                        count += 1;
                    }
                }
            }

            let pixel_index = (y as usize * width as usize + x as usize) * 4;
            data[pixel_index] = (sum_r / count as u32) as u8;     // Red
            data[pixel_index + 1] = (sum_g / count as u32) as u8; // Green
            data[pixel_index + 2] = (sum_b / count as u32) as u8; // Blue
            data[pixel_index + 3] = (sum_a / count as u32) as u8; // Alpha
        }
    }
} 