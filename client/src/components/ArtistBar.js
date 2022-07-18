import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from '../index';
import ListGroup from 'react-bootstrap/ListGroup';
import './ArtistBar.scss';

const ArtistBar = observer(() => {
    const {tracks} = useContext(Context);
    return (
        <ListGroup>
            <ListGroup.Item className={"mb-1"}
                style={{cursor: 'pointer'}}
                onClick={() => tracks.setSelectedArtist(tracks.artists)}
                key = {'ВсеАртисты'}>
                {'Все артисты'}
            </ListGroup.Item>
        {tracks.artists.map(artist => 
            <ListGroup.Item className={"mb-1"}
                style={{cursor: 'pointer'}}
                active={artist.id === tracks.selectedArtist.id}
                onClick={() => tracks.setSelectedArtist(artist)}
                key = {artist.id}>
                {artist.fullname}
            </ListGroup.Item>)}
      </ListGroup>
    );
})

export default ArtistBar;