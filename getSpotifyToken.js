const rp = require('request-promise');
const axios = require('axios')
const url = 'https://accounts.spotify.com/api/token'
const options = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':'Basic ZDM4YTAxMTNhZDNlNDI5YzlkYmZlNGVkNDgzYTI4NzQ6YTkxNzZjYWMyMGRiNDM5Mzg3N2U2YTBmZmI5OWJmZjM=',
        },
    
  };

function getSpotifyToken(){
    try{
    axios.post(url,{body:{
        'grant_type': 'refresh_token',
        'refresh_token': 'AQAufJixGs8_duPN5UFdmmDK2YdutcPQ7uYZERGj-1pX0OnW09OKf_eqfGTO5udyklsM9RkgO39E2LczQpHNlv32Bj9H-1ssxinmkJdaL0VBs-_1nBXpRyGw835j6QewDJs',
        'client_id': 'd38a0113ad3e429c9dbfe4ed483a2874'
    }},options).then((response) => {
        const data = response
        return response
    })} catch(e) {throw e}
}

getSpotifyToken()