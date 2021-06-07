const rp = require('request-promise');
const express = require('express');
const spotifyCreds = require('../../spotifyCreds.json');

// usar https://accounts.spotify.com/api/token

const app = express();

// GET /api/artists?name=
app.get('/api/artists', (req, res) => {
    let token = '';
    const artistNameNoSpaces = '';
    
    rp.get({
        url: 'localhost:3000/refresh_token?refresh_token={refresh_token}',
        params: {
            refresh_token: 'AQAufJixGs8_duPN5UFdmmDK2YdutcPQ7uYZERGj-1pX0OnW09OKf_eqfGTO5udyklsM9RkgO39E2LczQpHNlv32Bj9H-1ssxinmkJdaL0VBs-_1nBXpRyGw835j6QewDJs'
        }
    })
    .then((response) => {
        token = response;
    });

    rp.get({
            url: 'https://api.spotify.com/v1/search',
            headers: {Authorization: 'Bearer ' +  token},
            qs: {
                q: artistNameNoSpaces,
                type: 'artist'
            },
            json: true
        })
        .then((response) => {//hacer algo con response
        const options = '';
    });
});
/*
artist.id = artists.items[0].id
*/
{
    "artists": {
        "href": "https://api.spotify.com/v1/search?query=tania+bowra&type=artist&offset=0&limit=20",
        "items": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/08td7MxkoHQkXnWAYD8d6Q"
                },
                "followers": {
                    "href": null,
                    "total": 249
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/08td7MxkoHQkXnWAYD8d6Q",
                "id": "08td7MxkoHQkXnWAYD8d6Q",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/ab67616d0000b2731ae2bdc1378da1b440e1f610",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/ab67616d00001e021ae2bdc1378da1b440e1f610",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/ab67616d000048511ae2bdc1378da1b440e1f610",
                        "width": 64
                    }
                ],
                "name": "Tania Bowra",
                "popularity": 2,
                "type": "artist",
                "uri": "spotify:artist:08td7MxkoHQkXnWAYD8d6Q"
            }
        ],
        "limit": 20,
        "next": null,
        "offset": 0,
        "previous": null,
        "total": 1
    }
}

//api.spotify.com/v1/artists/{id}
/* 
artist.name = name
artist.country = 
artist.albums = 
artist.genres =  genres
*/
{
    "external_urls" : {
      "spotify" : "https://open.spotify.com/artist/0OdUWJ0sBjDrqHygGUXeCF"
    },
    "followers" : {
      "href" : null,
      "total" : 306565
    },
    "genres" : [ "indie folk", "indie pop" ],
    "href" : "https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF",
    "id" : "0OdUWJ0sBjDrqHygGUXeCF",
    "images" : [ {
      "height" : 816,
      "url" : "https://i.scdn.co/image/eb266625dab075341e8c4378a177a27370f91903",
      "width" : 1000
    }, {
      "height" : 522,
      "url" : "https://i.scdn.co/image/2f91c3cace3c5a6a48f3d0e2fd21364d4911b332",
      "width" : 640
    }, {
      "height" : 163,
      "url" : "https://i.scdn.co/image/2efc93d7ee88435116093274980f04ebceb7b527",
      "width" : 200
    }, {
      "height" : 52,
      "url" : "https://i.scdn.co/image/4f25297750dfa4051195c36809a9049f6b841a23",
      "width" : 64
    } ],
    "name" : "Band of Horses",
    "popularity" : 59,
    "type" : "artist",
    "uri" : "spotify:artist:0OdUWJ0sBjDrqHygGUXeCF"
}

//api.spotify.com/v1/albums/{id}/tracks
{
    "href": "https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqK/tracks?offset=0&limit=2",
    "items": [ 
        {
            "artists": [ 
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/08td7MxkoHQkXnWAYD8d6Q"
                    },
                    "href": "https://api.spotify.com/v1/artists/08td7MxkoHQkXnWAYD8d6Q",
                    "id": "08td7MxkoHQkXnWAYD8d6Q",
                    "name": "Tania Bowra",
                    "type": "artist",
                    "uri": "spotify:artist:08td7MxkoHQkXnWAYD8d6Q"
                } 
            ],
            "available_markets": [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "IE", "IS", "IT", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SI", "SK", "SV", "TR", "TW", "US", "UY" ],
            "disc_number": 1,
            "duration_ms": 276773,
            "explicit": false,
            "external_urls": {"spotify": "https://open.spotify.com/track/2TpxZ7JUBn3uw46aR7qd6V"},
            "href": "https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V",
            "id": "2TpxZ7JUBn3uw46aR7qd6V",
            "name": "All I Want",
            "preview_url": "https://p.scdn.co/mp3-preview/6d00206e32194d15df329d4770e4fa1f2ced3f57",
            "track_number": 1,
            "type": "track",
            "uri": "spotify:track:2TpxZ7JUBn3uw46aR7qd6V"
        }, 
        {
            "artists": [ 
                {
                    "external_urls": {"spotify": "https://open.spotify.com/artist/08td7MxkoHQkXnWAYD8d6Q"},
                    "href": "https://api.spotify.com/v1/artists/08td7MxkoHQkXnWAYD8d6Q",
                    "id": "08td7MxkoHQkXnWAYD8d6Q",
                    "name": "Tania Bowra",
                    "type": "artist",
                    "uri": "spotify:artist:08td7MxkoHQkXnWAYD8d6Q"
                } 
            ],
            "available_markets": [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "IE", "IS", "IT", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SI", "SK", "SV", "TR", "TW", "US", "UY" ],
            "disc_number": 1,
            "duration_ms": 247680,
            "explicit": false,
            "external_urls": {"spotify": "https://open.spotify.com/track/4PjcfyZZVE10TFd9EKA72r"},
            "href": "https://api.spotify.com/v1/tracks/4PjcfyZZVE10TFd9EKA72r",
            "id": "4PjcfyZZVE10TFd9EKA72r",
            "name": "Someday",
            "preview_url": "https://p.scdn.co/mp3-preview/2b15de922bf4f4b8cfe09c8448079b8ff7a45a5f",
            "track_number": 2,
            "type": "track",
            "uri": "spotify:track:4PjcfyZZVE10TFd9EKA72r"
        } 
    ],
    "limit": 2,
    "next": "https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqK/tracks?offset=2&limit=2",
    "offset": 0,
    "previous": null,
    "total": 11
  }
