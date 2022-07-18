import { $authHost, $host } from "./index";

export const createArtist = async (artist) => {
    const {data} = await $authHost.post('api/artist', artist);
    return data;
}

export const fetchArtists = async () => {
    const {data} = await $host.get('api/artist');
    return data;
}

export const fetchTracks = async (artistId, page, limit) => {
    const {data} = await $host.get('api/track',  {params: {
        artistId, page, limit
    }});
    return data;
}

