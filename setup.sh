#!/bin/sh

rm data.json

#          GUSTAVO CERATI
node main.js addArtist Gustavo_Cerati Argentina       # ID-0

#-Ahi vamos-------------------------------------------------
node main.js addAlbum 0 Ahi_vamos 2006                # ID-0

node main.js addTrack Caravana 0 195 rock             # ID-0
node main.js addTrack Adios    0 180 rock             # ID-1
node main.js addTrack Crimen   0 200 melodico         # ID-2

#-Siempre es hoy------------------------------------------
node main.js addAlbum 0 Siempre_es_Hoy 2002           # ID-1

node main.js addTrack Artefacto 1 300 rock            # ID-3
node main.js addTrack Karaoke   1 400 rock pop        # ID-4
node main.js addTrack Sulky     1 200 country         # ID-5

#/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#           RADIOHEAD
node main.js addArtist Radiohead Inglaterra           # ID-1

#-In Rainbows------------------------------------------------
node main.js addAlbum 1 In_Rainbows 2006              # ID-2

node main.js addTrack Bodysnatchers 2 250 rock        # ID-6
node main.js addTrack Videotape     2 240 indie       # ID-7
node main.js addTrack Reckoner      2 230 electrorock # ID-8

#-The Bends--------------------------------------------------
node main.js addAlbum 1 The_Bends 1995                # ID-3

node main.js addTrack Planet_Telex 3 251 rock         # ID-9
node main.js addTrack Bones        3 185 indie        # ID-10
node main.js addTrack Just         3 212 electrorock  # ID-11

#////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#       VAN HALEN
node main.js addArtist Van_Halen Estados_Unidos       # ID-2

#-Van Halen-----------------------------------------------
node main.js addAlbum 2 Van_Halen 1978                # ID-4

node main.js addTrack Eruption    4 85  hard_rock     # ID-12
node main.js addTrack On_Fire     4 180 rock          # ID-13
node main.js addTrack Atomic_Punk 4 170 hard_rock     # ID-14

#-5150---------------------------------------------------
node main.js addAlbum 2 5150 1986                     # ID-5

node main.js addTrack Dreams 5 272 rock               # ID-15
node main.js addTrack 5150   5 325 hard_rock rock     # ID-16
node main.js addTrack Inside 5 300 speed_rock         # ID-17

#////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#       USERS
node main.js createUser Iara                          # ID-0
node main.js createUser Francisco                     # ID-1
node main.js createUser Lucas                         # ID-2
node main.js createUser Lautaro                       # ID-3
node main.js createUser Arturo                        # ID-4

#       PLAYLISTS LUCAS 
node main.js addPlaylist Favs_Lucas     Lucas 10000 hard_rock                   # ID-0
node main.js addPlaylist Playlist_Lucas Lucas 10000 rock                        # ID-1

#       PLAYLISTS IARA
node main.js addPlaylist Favs_Iara Iara Iara 10000 electrorock indie country    # ID-2
node main.js addPlaylist Playlist_Iara  Iara 10000 indie                        # ID-3

#       PLAYLISTS FRANCISCO 
node main.js addPlaylist Favs_Francisco     Francisco 10000 rock melodico pop   # ID-4
node main.js addPlaylist Playlist_Francisco Francisco 10000 melodico pop        # ID-5

#       PLAYLISTS ARTURO
node main.js addPlaylist Favs_Arturo     Arturo 10000 rock hardrock             # ID-6
node main.js addPlaylist Playlist_Arturo Arturo 10000 rock                      # ID-7

#       PLAYLISTS LAUTARO
node main.js addPlaylist Favs_Lautaro     Lautaro 10000 indie rock              # ID-8
node main.js addPlaylist Playlist_Lautaro Lautaro 10000 indie                   # ID-9