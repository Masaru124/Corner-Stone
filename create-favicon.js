import { createCanvas, loadImage } from 'canvas'
import fs from 'fs'

async function createFavicon() {
  try {
    // Load the main logo
    const logoPath = '/home/masaru/Downloads/Projects/corner-stone-website/public/Logo Kit - CNRSTN/Logo CNRSTN.png'
    const image = await loadImage(logoPath)
    
    // Create a 32x32 canvas for favicon
    const canvas = createCanvas(32, 32)
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      throw new Error('Could not get canvas context')
    }
    
    // Draw the logo centered and scaled
    const scale = Math.min(32 / image.width, 32 / image.height)
    const scaledWidth = image.width * scale
    const scaledHeight = image.height * scale
    const x = (32 - scaledWidth) / 2
    const y = (32 - scaledHeight) / 2
    
    ctx.drawImage(image, x, y, scaledWidth, scaledHeight)
    
    // Save as favicon
    const faviconPath = '/home/masaru/Downloads/Projects/corner-stone-website/src/app/favicon.ico'
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync(faviconPath, buffer)
    
    console.log('Favicon created successfully!')
  } catch (error) {
    console.error('Error creating favicon:', error)
  }
}

createFavicon()
