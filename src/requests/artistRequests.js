const rp = require('request-promise');

// usar localhost:3000/refresh_token?refresh_token={refresh_token} para obtener un acces_token nuevo con cada consulta

const options = {
        url: 'https://api.spotify.com/v1/search',
        headers: { Authorization: 'Bearer ' + 'BQDvkJi6yWTdi50e-yQ0ruNiI0ikkAftrTeAtme0OV2oxyYOmABMAjZbeo2ipAXwopqdFC6mq0QsKMTgX1DUEnuV2xL44WTcQgzrTXfKAFYMkbpgk-cWQ4pIvemhdzzX1p_5hEYkQncg5S9Dlj3ENJjLEm3b' },
        json: true
};


// GET /api/artists?name=

rp.get(options).then((response) => //hacer algo con response
);

