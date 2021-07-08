const rp = require('request-promise');
const BASE_URL = 'https://api.spotify.com/v1/';

async function getSpotifyToken(){
    const options = {  
        uri : 'https://accounts.spotify.com/api/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization':'Basic ZDM4YTAxMTNhZDNlNDI5YzlkYmZlNGVkNDgzYTI4NzQ6YTkxNzZjYWMyMGRiNDM5Mzg3N2U2YTBmZmI5OWJmZjM=',
        },
        body: `grant_type=refresh_token&refresh_token=AQAufJixGs8_duPN5UFdmmDK2YdutcPQ7uYZERGj-1pX0OnW09OKf_eqfGTO5udyklsM9RkgO39E2LczQpHNlv32Bj9H-1ssxinmkJdaL0VBs-_1nBXpRyGw835j6QewDJs&client_id=d38a0113ad3e429c9dbfe4ed483a2874`
    };
    const response = await rp.post(options)
    const data = JSON.parse(response)
    return data.access_token;  
}
async function getSpotifyArtistId(artistName){
    const token = await getSpotifyToken()
    const options = {  
        uri : BASE_URL + 'search',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        qs:{
            q: artistName,
            type: "artist"
        }
    };
    const response = await rp.get(options);
    const data = JSON.parse(response);
    var artist = data.artists.items[0];
	if (artist == null){
	    throw Error("Artist not found in spotify")
	}
    return {id : artist.id,
            token : token};
                    
}

async function getAllArtistAlbums(artistName){
    const idAndToken = await getSpotifyArtistId(artistName);
    const artistId = idAndToken.id;
    const token = idAndToken.token;
    const options = {  
        uri : BASE_URL + `artists/${artistId}/albums`,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        qs:{
            q: artistName,
            type: "artist"
        }
    };
    const response = await rp.get(options)
    const data = JSON.parse(response)  
    const tracks= data.items;
    return tracks;
    
}

module.exports ={getAllArtistAlbums}