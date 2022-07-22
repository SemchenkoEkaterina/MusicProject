import { $authHost, $host } from "./index";

export const createArtist = async (artist) => {
    const {data} = await $authHost.post('api/artist', artist);
    return data;
}

export const fetchArtists = async () => {
    const {data} = await $host.get('api/artist');
    return data;
}

export const createTrack = async (track) => {
    const {data} = await $authHost.post('api/track', track);
    return data;
}

export const fetchTracks = async (artistId, page, limit) => {
    const {data} = await $host.get('api/track',  {params: {
        artistId, page, limit
    }});
    return data;
}

export const fetchOneTrack = async (id) => {
    const {data} = await $host.get('api/track/' + id);
    return data;
}

