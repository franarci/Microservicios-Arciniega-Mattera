const assert = require('chai').assert;
const libunqfy = require('./unqfy');
const { ArtistBelongs } = require('./src/belongs-classes/artistBelongs');
const { InstanceDoesNotExist,
        InstanceAlreadyExist } = require('./src/errors');
const { AssertionError } = require('assert');



function createAndAddArtist(unqfy, artistName, country) {
  const artist = unqfy.addArtist({ name: artistName, country });
  return artist;
}

function createAndAddAlbum(unqfy, artistId, albumName, albumYear) {
  return unqfy.addAlbum(artistId, { name: albumName, year: albumYear });
}

function createAndAddTrack(unqfy, albumId, trackName, trackDuraction, trackGenres) {
  return unqfy.addTrack(albumId, { name: trackName, duration: trackDuraction, genres: trackGenres });
}

function createAndAddUser(unqfy, username){
    return unqfy.createUser(username);
}

function listenTrack(unqfy, user, track){
  return unqfy.listenTrack(user, track);
}

function getListened(unqfy, user){
  return unqfy.getListened(user)
}

function timesListened(unqfy, user, track){
  return unqfy.timesListened(user,track)
}

describe('test nustro - tests de commands', () => {
    let unqfy = null;

    beforeEach(() => {
        unqfy = new libunqfy.UNQfy();
    });
    
            

})
function getTop3FromArtist(unqfy, artist){
  return unqfy.getTop3FromArtist(artist)
}

  describe('Add, remove and filter data', () => {
  let unqfy = null;

  beforeEach(() => {
    unqfy = new libunqfy.UNQfy();
  });

  it('should add an artist', () => {
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');

    assert.equal(artist.name, 'Guns n\' Roses');
    assert.equal(artist.country, 'USA');

  });

  it('should add an album to an artist', () => {
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);

    assert.equal(album.name, 'Appetite for Destruction');
    assert.equal(album.year, 1987);
  });

  it('should add a track to an album', () => {
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const track = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);

    assert.equal(track.name, 'Welcome to the jungle');
    assert.strictEqual(track.duration, 200);
    assert.equal(track.genres.includes('rock'), true);
    assert.equal(track.genres.includes('hard rock'), true);
    assert.lengthOf(track.genres, 2);
  });


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('test nuestro - when delete an artist should delete all his tracks from the UNQfy', () => { 
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        const track1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
        const track2 = createAndAddTrack(unqfy, album.id, 'californication', 100, ['rock', 'funk']);
        const idTrack1 = track1.id;
        const idTrack2 = track2.id;

        unqfy.deleteArtist(artist);

        try{
            unqfy.getInstanceByAttribute(idTrack1, 'track');
        } catch(e){
            if( e instanceof AssertionError ){ throw e; }
            assert.equal(e.message, `The track with id ${idTrack1} does not exist`);
        }
  });
    
  it('test nuestro - when delete an artist should delete all his tracks from the playlists', () => { 
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
      const track1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
      const track2 = createAndAddTrack(unqfy, album.id, 'californication', 100, ['rock', 'funk']);
          
      unqfy.createPlaylist('my playlist', null, 1400, ['pop', 'rock']);
      unqfy.deleteArtist(artist);
  

    const track1Belongs = unqfy.playlists[0].tracks.includes(track1)
    const track2Belongs = unqfy.playlists[0].tracks.includes(track2)
    
    assert.isFalse(track1Belongs)
    assert.isFalse(track2Belongs)


      
  });



  it('test nuestro - when delete an artist should delete all his albums from the UNQfy', () => { 
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const albumA = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        const albumB = createAndAddAlbum(unqfy, artist.id, 'Californication', 200);
        const idAlbumA = albumA.id;
        const idAlbumB = albumB.id;
        
        unqfy.deleteArtist(artist);

        try{
            unqfy.getInstanceByAttribute(idAlbumA, 'album');
        } catch(e){
            if( e instanceof AssertionError ){ throw e; }
            assert.equal(e.message, `The album with id ${idAlbumA} does not exist`);
        }

        try{
            unqfy.getInstanceByAttribute(idAlbumB, 'album');
        } catch(e){
            if( e instanceof AssertionError ){ throw e; }
            assert.equal(e.message, `The album with id ${idAlbumB} does not exist`);
        }

  });

  it('test nuestro - when delete an artist should delete it from the UNQfy', () => {  
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');

        unqfy.deleteArtist(artist);

        assert.isFalse(unqfy.artists.includes(artist));

  });

  it('test nuestro - when delete an album should delete it from the artist', () => {     
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);

        unqfy.deleteAlbum(album);
      
        assert.isFalse(artist.albums.includes(album));
       
  });
    
  it('test nuestro - when delete an album should delete it from UNQfy', () => {
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        const idAlbum = album.id;

        unqfy.deleteAlbum(album);

        try{
            unqfy.getInstanceByAttribute(idAlbum, 'album');
        } catch(e){
            if( e instanceof AssertionError ){ throw e; }
            assert.equal(e.message, `The album with id ${idAlbum} does not exist`);
        }
  });

  it('test nuestro - when delete an album should delete all the tracks stored in playlists that belongs to the album', () => { 
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
      const track1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
      const track2 = createAndAddTrack(unqfy, album.id, 'It\'s so easy', 200, ['rock', 'hard rock']);
      
      unqfy.createPlaylist('my playlist', null, 1400, ['pop', 'rock']);

      unqfy.deleteAlbum(album)

      assert.isFalse(unqfy.playlists[0].tracks.includes(track1));
      assert.isFalse(unqfy.playlists[0].tracks.includes(track2));

  });

  it('test nuestro - when delete an album should delete all the tracks stored in UNQfy that belongs to the album', () => { 
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
      const track1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
      const track2 = createAndAddTrack(unqfy, album.id, 'It\'s so easy', 200, ['rock', 'hard rock']);
      const idTrack1 = track1.id
      const idTrack2 = track2.id
      unqfy.deleteAlbum(album)

      try{
        unqfy.getInstanceByAttribute(idTrack1, 'track');
      } catch(e) {
        if( e instanceof AssertionError ){throw e}
        assert.equal(e.message, `The track with id ${idTrack1} does not exist`);
      }

      try{
        unqfy.getInstanceByAttribute(idTrack2, 'track');
      } catch(e) {
        if( e instanceof AssertionError ){throw e}
        assert.equal(e.message, `The track with id ${idTrack2} does not exist`);
      }
  });
    

  it('test nuestro - when delete a track should delete it from UNQfy', () => {
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        const track = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
        const idTrack = track.id;

        unqfy.deleteTrack(track);

        try{
            unqfy.getInstanceByAttribute(idTrack, 'track');
        } catch(e){
            if( e instanceof AssertionError ){ throw e; }
            assert.equal(e.message, `The track with id ${idTrack} does not exist`);
        }
  });


  it('test nuestro - when delete a track should delete a track from an album', () => {
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        const track = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);

        unqfy.deleteTrack(track);

        assert.isFalse(album.tracks.includes(track));
  });

  it('test nuestro - when delete a track should delete a track from the playlists', () => { 
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
      const track1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
      const track2 = createAndAddTrack(unqfy, album.id, 'It\'s so easy', 200, ['rock', 'hard rock']);
      
      unqfy.createPlaylist('my playlist', null, 1400, ['pop', 'rock']);

      unqfy.deleteTrack(track1)
 
      const track1Belongs = unqfy.playlists[0].tracks.includes(track1)
      const track2Belongs = unqfy.playlists[0].tracks.includes(track2)
        
      assert.isFalse(track1Belongs);
      assert.isTrue(track2Belongs);
    
  });

  it('test nuestro - when delete a user should delete it from UNQfy', () => { 
    const user1  = createAndAddUser(unqfy, 'user1')
    const idUser = user1.id
    unqfy.deleteUser(user1)

    try{
      unqfy.getInstanceByAttribute(idUser, 'user');
    } catch(e){
      if( e instanceof AssertionError ){ throw e; }
      assert.equal(e.message, `The user with id ${idUser} does not exist`);
    }
  
  });

  it('test nuestro - when delete a user should delete it from the playlists', () => { 
    const user1  = createAndAddUser(unqfy, 'user1')
    const playL = unqfy.createPlaylist('my playlist', user1, 1400, ['pop', 'rock']);
    
    unqfy.deleteUser(user1)
    assert.isFalse(playL.user.includes(user1))  
  
  });


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



 /* it('should find different things by name', () => {
    const artist1 = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album1 = createAndAddAlbum(unqfy, artist1.id, 'Roses Album', 1987);
    const track = createAndAddTrack(unqfy, album1.id, 'Roses track', 200, ['pop', 'movie']);
    const playlist = unqfy.createPlaylist('Roses playlist', ['pop'], 1400);

    const results = unqfy.searchByName('Roses');
    assert.deepEqual(results, {
      artists: [artist1],
      albums: [album1],
      tracks: [track],
      playlists: [playlist],
    });
  });*/
  


  it('should get all tracks matching genres', () => {
    const artist1 = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album1 = createAndAddAlbum(unqfy, artist1.id, 'Appetite for Destruction', 1987);
    const t0 = createAndAddTrack(unqfy, album1.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
    const t1 = createAndAddTrack(unqfy, album1.id, 'Sweet Child o\' Mine', 500, ['rock', 'hard rock', 'pop', 'movie']);

    const artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
    const album2 = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
    const t2 = createAndAddTrack(unqfy, album2.id, 'Trhiller', 200, ['pop', 'movie']);
    createAndAddTrack(unqfy, album2.id, 'Another song', 500, ['classic']);
    const t3 = createAndAddTrack(unqfy, album2.id, 'Another song II', 500, ['movie']);

    const tracksMatching = unqfy.getTracksMatchingGenres(['pop', 'movie']);
    

    //assert.equal(tracks.matching.constructor.name, Array);
    assert.isArray(tracksMatching);
    assert.lengthOf(tracksMatching, 4);
    assert.equal(tracksMatching.includes(t0), true);
    assert.equal(tracksMatching.includes(t1), true);
    assert.equal(tracksMatching.includes(t2), true);
    assert.equal(tracksMatching.includes(t3), true);
  });

  it('should get all tracks matching artist', () => {
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
    const t2 = createAndAddTrack(unqfy, album.id, 'It\'s so easy', 200, ['rock', 'hard rock']);

    const album2 = createAndAddAlbum(unqfy, artist.id, 'Use Your Illusion I', 1992);
    const t3 = createAndAddTrack(unqfy, album2.id, 'Don\'t Cry', 500, ['rock', 'hard rock']);

    const artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
    const album3 = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
    createAndAddTrack(unqfy, album3.id, 'Thriller', 200, ['pop', 'movie']);
    createAndAddTrack(unqfy, album3.id, 'Another song', 500, ['classic']);
    createAndAddTrack(unqfy, album3.id, 'Another song II', 500, ['movie']);

    const matchingTracks = unqfy.getTracksMatchingArtist(artist.name);
    

    assert.isArray(matchingTracks);
    assert.lengthOf(matchingTracks, 3);
    assert.isTrue(matchingTracks.includes(t1));
    assert.isTrue(matchingTracks.includes(t2));
    assert.isTrue(matchingTracks.includes(t3));
  });

  it('should get all tracks,artists,albums matching string parcial', () => {
    const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);

    const artist2 = createAndAddArtist(unqfy, 'Michael Gun', 'USA');
    const album2 = createAndAddAlbum(unqfy, artist2.id, 'Well', 1987);
    const t4 =createAndAddTrack(unqfy, album2.id, 'Give to me', 500, ['classic']);
    

    const matchingParcial = unqfy.getMatchingParcial('Gun');
    
    assert.isArray(matchingParcial);
    assert.lengthOf(matchingParcial, 2);
    assert.isTrue(matchingParcial.includes(artist));
    assert.isTrue(matchingParcial.includes(artist2))
  
  });
});

describe('Playlist Creation and properties', () => {
  let unqfy = null;

  beforeEach(() => {
    unqfy = new libunqfy.UNQfy();
  });

  it('should create a playlist as requested', () => {
    const artist = createAndAddArtist(unqfy, 'Guns Roses', 'USA');
    const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
    createAndAddTrack(unqfy, album.id, 'Sweet Child  Mine', 1500, ['rock', 'hard rock', 'pop', 'movie']);

    const artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
    const album2 = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
    const t2 = createAndAddTrack(unqfy, album2.id, 'Thriller', 200, ['pop', 'movie']);
    const t3 = createAndAddTrack(unqfy, album2.id, 'Another song', 500, ['pop']);
    const t4 = createAndAddTrack(unqfy, album2.id, 'Another song II', 500, ['pop']);

    const user = unqfy.createUser('pepe');

    const playlist2 = unqfy.createPlaylist('my playlist', null, 1400, ['pop', 'rock']);

    assert.equal(playlist2.name, 'my playlist');
    assert.isAtMost(playlist2.getDuration(), 1400);
    assert.isTrue(playlist2.hasTrack(t1));
    assert.isTrue(playlist2.hasTrack(t2));
    assert.isTrue(playlist2.hasTrack(t3));
    assert.isTrue(playlist2.hasTrack(t4));
    assert.lengthOf(playlist2.tracks, 4);
  });
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('Test nuestro - User Creation and properties', () => {
    let unqfy = null;

    beforeEach(() => {
        unqfy = new libunqfy.UNQfy();
    });

    it('should create an user', () => {
        const user = createAndAddUser(unqfy, 'MasterUser');

        assert.equal(user.username, 'MasterUser');

    });
    
    it('should listen a track and know listened tracks', () => {
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
      const track1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock'])
      const track2 =createAndAddTrack(unqfy, album.id, 'Sweet Child o\' Mine', 1500, ['rock', 'hard rock', 'pop', 'movie']);
      const user = createAndAddUser(unqfy, 'Listener');
      const listener = listenTrack(unqfy, user, track1)
      
     const firstListened = getListened(unqfy,listener)[0].name
     
      assert.equal(firstListened.localeCompare( 'Welcome to the jungle'), 0)
      assert.equal(timesListened(unqfy, user, track1), 1)
      assert.equal(timesListened(unqfy, user, track2), 0)
    });
})

describe('Test nuestro - Belongs tests', () => {
    let unqfy = null;

    beforeEach(() => {
        unqfy = new libunqfy.UNQfy();
    });
    
            
    it('it should tell if the artist is in the UNQfy', () => {
                
        const artist = createAndAddArtist(unqfy, 'bob', 'jamaica');
        const artistBelongs = new ArtistBelongs(unqfy.artists);

        const boolean = artistBelongs.execute({
                            name: artist.name,
                            country: artist.country
                        });

        assert.isTrue(boolean);
    });

});

describe('Test nuestro - This is..', () => {
    let unqfy = null;

    beforeEach(() => {
        unqfy = new libunqfy.UNQfy();
    });
    
            
    it('it should tell the artist top listened songs', () => {
      const user1 = createAndAddUser(unqfy, "user1")
      const user2 = createAndAddUser(unqfy,"user2")
      
      const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
      const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
      const track1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock'])
      const track2 = createAndAddTrack(unqfy, album.id, 'Sweet Child o\' Mine', 1500, ['rock', 'hard rock', 'pop', 'movie']);
      const track3 = createAndAddTrack(unqfy, album.id, 'Dont You Cry', 1500, ['rock', 'hard rock', 'pop', 'movie']);
      const track4 = createAndAddTrack(unqfy, album.id, 'Do Cry', 1500, ['rock', 'hard rock', 'pop', 'movie']);

      user2.listenTrack(track3)
      user2.listenTrack(track2)
      user2.listenTrack(track1)
      user2.listenTrack(track3)   
      user2.listenTrack(track3)
      user2.listenTrack(track2)
      
      user1.listenTrack(track1)
      user1.listenTrack(track2)
      user1.listenTrack(track4)
      user1.listenTrack(track2)
      user2.listenTrack(track3)
      user2.listenTrack(track3)
                      
      const top3 = getTop3FromArtist(unqfy, artist)

      assert.equal(top3[0].name.localeCompare('Dont You Cry'), 0);
      assert.equal(top3[1].name.localeCompare('Sweet Child o\' Mine'), 0);
      assert.equal(top3[2].name.localeCompare('Welcome to the jungle'), 0);
    });

});

describe('Test nuestro - getInstancesMatchingAttribute', () => {
    let unqfy = null;

    beforeEach(() => {
        unqfy = new libunqfy.UNQfy();
    });
    
            
    it('deberia devolver al artista que busco por cualquiera de sus atributos directos', () => {
        
        const artistAdded = createAndAddArtist(unqfy, 'bob', 'jamaica');

        const artistRequestedByName = 
            unqfy.getInstancesMatchingAttribute(
                'artist',
                'name',
                'bob'
            );

        const artistRequestedByCountry = 
        unqfy.getInstancesMatchingAttribute(
            'artist',
            'country',
            'jamaica'
        );

        assert.equal(artistAdded, artistRequestedByName);
        assert.equal(artistAdded, artistRequestedByCountry);
    });

    it('deberia devolver al album que busco por alguno de sus atributos directos', () => {
        
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const albumAdded = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);

        const albumRequestedByName = 
            unqfy.getInstancesMatchingAttribute(
                'album',
                'name',
                'Appetite for Destruction'
            );

        const albumRequestedByYear = 
            unqfy.getInstancesMatchingAttribute(
                'album',
                'year',
                1987
            );

        assert.equal(albumAdded, albumRequestedByName);
        assert.equal(albumAdded, albumRequestedByYear);
    });

    it('deberia devolver al track que busco por alguno de sus atributos directos', () => {
        
        const genres = ['rock', 'hard rock'];
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        const trackAdded = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, genres);

        const trackRequestedByName = 
            unqfy.getInstancesMatchingAttribute(
                'track',
                'name',
                'Welcome to the jungle'
            );

        const trackRequestedByDuration = 
            unqfy.getInstancesMatchingAttribute(
                'track',
                'duration',
                200
            );
        
        const trackRequestedByGenres = 
            unqfy.getInstancesMatchingAttribute(
                'track',
                'genres',
                genres
            );

        assert.equal(trackAdded, trackRequestedByName);
        assert.equal(trackAdded, trackRequestedByDuration);
        assert.equal(trackAdded, trackRequestedByGenres);
    });

    it('deberia devolver el album que busco por alguno de sus atributos in-directos', () => {
        
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const appetite = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);

        const albumRequestedByArtistName = 
            unqfy.getInstancesMatchingAttribute(
                'album',
                'name',
                'Guns n\' Roses',
                true,
                'artist'
            );

        const albumRequestedByCountryOfArtist = 
            unqfy.getInstancesMatchingAttribute(
                'album',
                'country',
                'USA',
                true,
                'artist'
            );

        assert.equal(albumRequestedByArtistName, appetite);
        assert.equal(albumRequestedByCountryOfArtist, appetite);
    });

    it('deberia devolver los albumes que busco por alguno de sus atributos in-directos', () => {
        
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const appetite = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        const use = createAndAddAlbum(unqfy, artist.id, 'Use your illution', 1900);

        const albumsRequestedByArtistName = 
            unqfy.getInstancesMatchingAttribute(
                'album',
                'name',
                'Guns n\' Roses',
                true,
                'artist'
            );

        const albumsRequestedByCountryOfArtist = 
            unqfy.getInstancesMatchingAttribute(
                'album',
                'country',
                'USA',
                true,
                'artist'
            );

        assert.isTrue(albumsRequestedByArtistName.some(album => album === appetite));
        assert.isTrue(albumsRequestedByArtistName.some(album => album === use));
        assert.isTrue(albumsRequestedByCountryOfArtist.some(album => album === appetite));
        assert.isTrue(albumsRequestedByCountryOfArtist.some(album => album === use));
    });

    it('deberia devolver al track que busco por alguno de sus atributos in-directos', () => {
        
        const genres = ['rock', 'hard rock'];
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        const trackAdded = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, genres);

        const trackRequestedBy_artist_name = 
            unqfy.getInstancesMatchingAttribute(
                'track',
                'name',
                'Guns n\' Roses',
                true,
                'artist'
            );

        const trackRequestedBy_artist_country = 
            unqfy.getInstancesMatchingAttribute(
                'track',
                'country',
                'USA',
                true,
                'artist'
            );

        const trackRequestedBy_album_name = 
            unqfy.getInstancesMatchingAttribute(
                'track',
                'name',
                'Appetite for Destruction',
                true,
                'album'
            );

        const trackRequestedBy_album_year = 
            unqfy.getInstancesMatchingAttribute(
                'track',
                'year',
                1987,
                true,
                'album'
            );

        assert.equal( trackRequestedBy_artist_name   , trackAdded );
        assert.equal( trackRequestedBy_artist_country, trackAdded );
        assert.equal( trackRequestedBy_album_name    , trackAdded );
        assert.equal( trackRequestedBy_album_year    , trackAdded );
    });
    
    it('deberia devolver los tracks que busco por alguno de sus atributos in-directos', () => {
        
        const genres = ['rock', 'hard rock'];
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        const welcome = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, genres);
        const nightrain = createAndAddTrack(unqfy, album.id, 'Nightrain', 300, genres);

        const trackRequestedBy_artist_name = 
            unqfy.getInstancesMatchingAttribute(
                'track',
                'name',
                'Guns n\' Roses',
                true,
                'artist'
            );

        const trackRequestedBy_artist_country = 
            unqfy.getInstancesMatchingAttribute(
                'track',
                'country',
                'USA',
                true,
                'artist'
            );

        const trackRequestedBy_album_name = 
            unqfy.getInstancesMatchingAttribute(
                'track',
                'name',
                'Appetite for Destruction',
                true,
                'album'
            );

        const trackRequestedBy_album_year = 
            unqfy.getInstancesMatchingAttribute(
                'track',
                'year',
                1987,
                true,
                'album'
            );

        assert.isTrue( trackRequestedBy_artist_name.some(track => track === welcome ) );
        assert.isTrue( trackRequestedBy_artist_country.some(track => track === welcome ) );
        assert.isTrue( trackRequestedBy_album_name.some(track => track === welcome ) );
        assert.isTrue( trackRequestedBy_album_year.some(track => track === welcome ) );

        assert.isTrue( trackRequestedBy_artist_name.some(track => track === nightrain) );
        assert.isTrue( trackRequestedBy_artist_country.some(track => track === nightrain) );
        assert.isTrue( trackRequestedBy_album_name.some(track => track === nightrain) );
        assert.isTrue( trackRequestedBy_album_year.some(track => track === nightrain) );
    });

});