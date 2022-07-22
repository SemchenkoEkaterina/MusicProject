
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOneTrack } from '../http/trackAPI';
import { ARTISTS_ROUTE } from '../utils/consts';

const TrackDetail = () => {
    const [track, setTrack] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchOneTrack(id).then(data => setTrack(data))
    }, []);
    return (
        <Container className="mt-4">
            <Row className="d-flex align-items-center m-1 mb-4">
                <div className="d-flex align-items-center">
                    <div><h3>{track.length > 0 && track[0].name}&nbsp;{`:`}&nbsp;</h3></div>
                    {track.length > 0 && <div onClick={() => navigate(ARTISTS_ROUTE + '/' + track[0].id)} style={{cursor: 'pointer'}}><h3>{track.length > 0 && track[0].fullname}</h3></div>}
                </div>
            </Row>
            <Row className="d-flex flex-column m-3">
                <audio controls style={{ width: '100%' }} >
                    {track.length > 0 && <source src={'http://localhost:8000/' + track[0].file} type='audio/mpeg' />}
                    <p>Your browser doesn't support HTML5 audio. Here is a {track.length > 0 && <a href={'http://localhost:8000/' + track[0].file}>link to the audio</a>}instead.</p>
                </audio>
            </Row>
            <Row className="d-flex flex-column m-3 mt-5">
                <Card
                    className="d-flex flex-column justify-content-around pt-3 pb-3"
                    style={{ width: '100%', height: '100%', fontSize: 16, border: '5px solid #8f6366' }}
                >

                    <h4>Информация:</h4>
                    {track.length > 0 && track[0].information}
                </Card>
            </Row>
        </Container>
    );
};

export default TrackDetail;