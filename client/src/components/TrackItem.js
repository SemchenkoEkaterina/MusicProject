

import React from 'react';
import {Card, Col} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import {TRACKS_ROUTE, ARTISTS_ROUTE} from "../utils/consts";

const TrackItem = ({track}) => {
    const navigate = useNavigate();
    return (
        <Col md={10} className={"mt-1 mb-4"}>
            <Card style={{cursor: 'pointer'}} border={"light"}>
                <div className="mt-2 mb-2" onClick={() => navigate(TRACKS_ROUTE + '/' + track.trackId)}>
                <audio controls style={{width: '100%'}} >
                    <source src={'http://localhost:8000/' + track.file} type='audio/mpeg'/>
                    <p>Your browser doesn't support HTML5 audio. Here is a <a href={'http://localhost:8000/' + track.file}>link to the audio</a> instead.</p>
                </audio>
                </div>
                <div className="mt-2 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div onClick={() => navigate(TRACKS_ROUTE + '/' + track.trackId)}><u>{track.name}</u></div>
                        <div onClick={() => navigate(ARTISTS_ROUTE + '/' + track.artistId)}>&nbsp;{`(`}<u>{track.fullname}</u>{`)`}</div>
                    </div>
                </div>
            </Card>
        </Col>
    );
};

export default TrackItem;