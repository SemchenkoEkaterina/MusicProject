
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../index';
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom'
import { fetchOneArtist, fetchTracks } from "../http/trackAPI";
import { TRACKS_ROUTE } from "../utils/consts";

const ArtistDetail = () => {
    const { tracks } = useContext(Context);
    const [artist, setArtist] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchOneArtist(id).then(data => setArtist(data));
        fetchTracks(id).then(data => {
            tracks.setTracks(data[1]);
        })
    }, []);

    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    

    return (
        <Container className="mt-3">
            <Row>
                <Col md={6}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{ fontSize: 32, border: '5px solid #8f6366' }}
                    >
                        {artist.length > 0 && <Image width='50%' height='50%' className='mt-3 mb-3' src={'http://localhost:8000/' + artist[0].image} />}
                        {artist.length > 0 && <h2>{artist[0].fullname}</h2>}
                        <h3 className='mt-3 mb-3' >   Дата рождения: {artist.length > 0 && new Date(artist[0].datebirth).toLocaleString("ru", options)} </h3>
                    </Card>
                </Col>
                <Col md={6} className="d-flex flex-column align-items-center justify-content-around">
                    <h6><u>Информация: </u>{artist.length > 0 && artist[0].information}</h6>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3 mt-4" style={{ borderTop: '1px solid #8f6366' }}>
                <h2 className="mt-2">Трэки</h2>
                {tracks.tracks.map((track) =>
                    <Row key={track.trackId} style={{ padding: 10 }}>
                        <div style={{cursor: 'pointer'}} onClick={() => navigate(TRACKS_ROUTE + '/' + track.trackId)}><u>{track.name}</u></div>
                        <div className="mt-2 mb-2" onClick={() => navigate(TRACKS_ROUTE + '/' + track.trackId)}>
                            <audio controls style={{ width: '100%' }} >
                                <source src={'http://localhost:8000/' + track.file} type='audio/mpeg' />
                                <p>Your browser doesn't support HTML5 audio. Here is a <a href={'http://localhost:8000/' + track.file}>link to the audio</a> instead.</p>
                            </audio>
                        </div>
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default ArtistDetail;