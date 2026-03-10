const https = require('https');

https.get('https://glik7.com/', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        const urls = [...data.matchAll(/<img[^>]+src=["']([^"']+)["']/ig)].map(m => m[1]);
        const logos = urls.filter(u => u.toLowerCase().includes('logo') || u.toLowerCase().includes('brand') || u.toLowerCase().includes('glik'));
        console.log(logos.join('\n'));
    });
}).on('error', (err) => {
    console.log("Error: " + err.message);
});
