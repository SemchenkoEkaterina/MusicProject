import { makeAutoObservable } from 'mobx';

export default class TracksStore {
    constructor() {
        this._tracks = [];
        this._artists = [];
        this._selectedArtist = {};
        this._selectedModalArtist = {};
        this._page = 1;
        this._totalCount = 0;
        this._limit = 2 ;
        makeAutoObservable(this);
    }

    setTracks(tracks) {
        this._tracks = tracks;
    }

    setArtists(artists) {
        this._artists = artists;
    }

    setSelectedArtist(artist) {
        this._selectedArtist = artist;
    }
    
    setSelectedModalArtist(artist) {
        this._selectedModalArtist = artist;
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get tracks() {
        return this._tracks;
    }

    get artists() {
        return this._artists;
    }

    get selectedArtist() {
        return this._selectedArtist;
    }

    get selectedModalArtist() {
        return this._selectedModalArtist;
    }

    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}