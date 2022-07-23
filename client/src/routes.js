import Admin from "./pages/Admin";
import ArtistDetail from "./pages/ArtistDetail";
import Artists from "./pages/Artists";
import Auth from "./pages/Auth";
import TrackDetail from "./pages/TrackDetail";
import Tracks from "./pages/Tracks";
import { ADMIN_ROUTE, ARTISTS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, TRACKS_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        component: <Admin/>
    },
    {
        path: LOGIN_ROUTE,
        component: <Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        component: <Auth/>
    },
    {
        path: ARTISTS_ROUTE,
        component: <Artists/>,
    },
    {
        path: ARTISTS_ROUTE + '/:id',
        component: <ArtistDetail/>,
    },
    {
        path: TRACKS_ROUTE,
        component: <Tracks/>,
    },
    {
        path: TRACKS_ROUTE + '/:id',
        component: <TrackDetail/>,
    }
]

