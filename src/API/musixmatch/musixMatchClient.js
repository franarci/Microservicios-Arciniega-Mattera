const rp = require('request-promise');
const apikey = 'e0283ca2b405c3f3342ac66ca27862e1';
const BASE_URL = 'http://api.musixmatch.com/ws/1.1/';



async function mmGetLyrics(track){

	const options= {
	  uri: BASE_URL + "matcher.lyrics.get",
	  qs: {
		q_artist: track.artist.name,
		q_track: track.name,
		apikey: apikey,
	  },
	  json: true 
	};

    let data = await rp.get(options).then((response) => {
		if (response.message.header.status_code !== 200){
			throw new Error('header status code: '+ response.message.header.status_code);
		}
        var body = response.artists;
        var lyrics = body.lyrics.lyrics_body; 
        return lyrics;
        }).catch((error) => {throw error;});
    return data;
}

module.exports = {mmGetLyrics}