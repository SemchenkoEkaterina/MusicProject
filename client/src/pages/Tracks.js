import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../index';
import ArtistBar from '../components/ArtistBar';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchArtists, fetchTracks } from '../http/trackAPI';
import TrackList from '../components/TrackList';
import CreateTrack from '../components/modals/CreateTrack';
import PaginationComponent from '../components/Pagination';
import ButtonAdd from '../components/ButtonAdd';

const Tracks = observer(() => { 
    const {tracks} = useContext(Context);
    const { user } = useContext(Context);

    const [trackVisible, setTrackVisible] = useState(false)

useEffect(() => {
    fetchArtists().then(data => tracks.setArtists(data))
    fetchTracks(null, 1, 2).then(data => {
        tracks.setTracks(data[1]);
        tracks.setTotalCount(data[0][0].count);
    })
}, []);

useEffect(() => {
    fetchTracks(tracks.selectedArtist.id, tracks.page, 2).then(data => {
        tracks.setTracks(data[1]);
        tracks.setTotalCount(data[0][0].count);
    })
}, [tracks.selectedArtist, tracks.page, ])
    return (
        <Container className="mt-4">
             <Row className="mt-2">
             <Col md={3}/>
                <Col md={9}>
                    <p class="font-italic font-weight-bold fs-2">{'Плейлист'}</p>
                </Col>
             </Row>
            <Row className="mt-2">
                <Col md={3}>
                    <ArtistBar/>
                </Col>
                <Col md={9}>
                    <TrackList/>
                    <ButtonAdd isAuth={user.isAuth} text='Добавить трэк' setVisible={setTrackVisible}/>
                    <CreateTrack show={trackVisible} onHide={() => setTrackVisible(false)}/>
                    <PaginationComponent/>
                </Col>
            </Row>
        </Container>
    )
});

export default Tracks;