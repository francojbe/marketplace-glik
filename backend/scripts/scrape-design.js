const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            // Handle redirects if necessary, but simple get works for now
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                resolve(fetchUrl(res.headers.location));
                return;
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function scrape() {
    try {
        console.log("🔍 Iniciando escaneo de Glik7.com...\n");
        const html = await fetchUrl('https://glik7.com/');

        // Extract Image URLs
        const imgRegex = /<img[^>]+src=["']([^"']+)["']/ig;
        let images = [...html.matchAll(imgRegex)].map(m => m[1]);

        const bgRegex = /background-image:\s*url\(["']?([^"'\)]+)["']?\)/ig;
        let bgs = [...html.matchAll(bgRegex)].map(m => m[1]);

        // Extract Colors (Hex) from inline styles or HTML
        const colorRegex = /#[0-9a-fA-F]{3,6}\b/g;
        let colorsHTML = [...html.matchAll(colorRegex)].map(m => m[0].toLowerCase());

        // Extract CSS Links
        const cssRegex = /<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/ig;
        let cssLinks = [...html.matchAll(cssRegex)].map(m => m[1]);

        // Fetch a couple of main CSS files to find brand colors
        let cssContent = "";
        for (let i = 0; i < Math.min(cssLinks.length, 3); i++) {
            let link = cssLinks[i];
            if (link.startsWith('//')) link = 'https:' + link;
            else if (link.startsWith('/')) link = 'https://glik7.com' + link;

            try {
                const css = await fetchUrl(link);
                cssContent += css;
            } catch (e) {
                // Ignore fetch errors for external CSS
            }
        }

        let colorsCSS = [...cssContent.matchAll(colorRegex)].map(m => m[0].toLowerCase());

        // Extract Fonts
        const fontRegex = /font-family:\s*([^;\}]+)/ig;
        let fonts = [...cssContent.matchAll(fontRegex)].map(m => m[1].trim());

        // Clean up lists
        const uniqueImages = [...new Set([...images, ...bgs])].filter(u => u.includes('glik7') && !u.includes('svg'));
        const uniqueColors = [...new Set([...colorsHTML, ...colorsCSS])];
        const uniqueFonts = [...new Set(fonts)].map(f => f.replace(/['"]/g, ''));

        console.log("=== 🎨 PALETA DE COLORES ENCONTRADA ===");
        console.log(uniqueColors.join(', '));
        console.log("\n=== 🔤 TIPOGRAFÍAS (FUENTES) ===");
        console.log(uniqueFonts.slice(0, 10).join(', '));
        console.log("\n=== 📸 IMÁGENES RELEVANTES ===");
        console.log(uniqueImages.slice(0, 15).join('\n')); // Mostramos las primeras 15

    } catch (err) {
        console.error("Error al hacer el scraping:", err.message);
    }
}

scrape();
