const https = require('https');

https.get('https://glik7.com/', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        const urls = [...data.matchAll(/<img[^>]+src=["']([^"']+)["']/ig)].map(m => m[1]);
        const bgUrls = [...data.matchAll(/background-image:\s*url\(["']?([^"'\)]+)["']?\)/ig)].map(m => m[1]);
        console.log("--- IMAGES ---");
        console.log(urls.join('\n'));
        console.log("--- BGs ---");
        console.log(bgUrls.join('\n'));
    });
}).on('error', (err) => {
    console.log("Error: " + err.message);
});
