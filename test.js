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

function listenTrack(unqfy, userName, trackName){
  return unqfy.listenTrack(userName, trackName);
}

function getListened(unqfy, userName){
  return unqfy.getListened(userName)
}

function timesListened(unqfy, userName, trackName){
  return unqfy.timesListened(userName,trackName)
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


/*
it('test nuestro - when delete a track should delete a track from the playlists', () => {   });
it('test nuestro - when delete an artist should delete all his tracks from the playlists', () => {  });
it('test nuestro - when delete an album should delete all the tracks stored in playlists that belongs to the album', () => { 
    crear el artista
    crear el album
    crear playlists
    agregar temas de un album a distintas playlists
    borrar el album
    
    chequear que cada item en unqfy.playlists cumple la condidicion de que no contiene alguno o todos los tracks del album
});
*/
    it('test nuestro - when delete an artist should delete all his tracks from the UNQfy', () => { 
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        const track1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
        const track2 = createAndAddTrack(unqfy, album.id, 'californication', 100, ['rock', 'funk']);
        const idTrack1 = track1.id;
        const idTrack2 = track2.id;

        unqfy.deleteArtist(artist);

        try{
            unqfy.getInstanceById(idTrack1, 'track');
        } catch(e){
            if( e instanceof AssertionError ){ throw e; }
            assert.equal(e.message, `The track with id ${idTrack1} does not exist`);
        }

        try{
            unqfy.getInstanceById(idTrack2, 'track');
        } catch(e){
            if( e instanceof AssertionError ){ throw e; }
            assert.equal(e.message, `The track with id ${idTrack2} does not exist`);
        }
    });

    it('test nuestro - when delete an artist should delete all his albums from the UNQfy', () => { 
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const albumA = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        const albumB = createAndAddAlbum(unqfy, artist.id, 'Californication', 200);
        const idAlbumA = albumA.id;
        const idAlbumB = albumB.id;
        
        unqfy.deleteArtist(artist);

        try{
            unqfy.getInstanceById(idAlbumA, 'album');
        } catch(e){
            if( e instanceof AssertionError ){ throw e; }
            assert.equal(e.message, `The album with id ${idAlbumA} does not exist`);
        }

        try{
            unqfy.getInstanceById(idAlbumB, 'album');
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
            unqfy.getInstanceById(idAlbum, 'album');
        } catch(e){
            if( e instanceof AssertionError ){ throw e; }
            assert.equal(e.message, `The album with id ${idAlbum} does not exist`);
        }
    });
    

    it('test nuestro - when delete a track should delete it from UNQfy', () => {
        const artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        const album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        const track = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
        const idTrack = track.id;

        unqfy.deleteTrack(track);

        try{
            unqfy.getInstanceById(idTrack, 'track');
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



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  it('should find different things by name', () => {
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
  });

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

    const playlist2 = unqfy.createPlaylist('my playlist', ['pop', 'rock'], 1400);

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
      user = listenTrack(unqfy, user.userName, track1.trackName)
      
      timesListened = timesListened(unqfy, user.userName, track1.trackName)
  
      assert.equal(getListened(unqfy, user.userName)[0].trackName.localeCompare( 'Welcome to the jungle'.c), 0)
      assert.equal(timesListened(user.userName, track1.trackName), 1)
      assert.equal(timesListened(user.userName, track2.trackName), 0)
    });



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
  

});