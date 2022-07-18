import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import TrackItem from "./TrackItem";

const TrackList = observer(() => {
    const {tracks} = useContext(Context);
    return (
        <Row className="d-flex">
            {tracks.tracks.map(track =>
                <TrackItem key={track.trackId} track={track}/>
            )}
        </Row>
    );
});

export default TrackList;