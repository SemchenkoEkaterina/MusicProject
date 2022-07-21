import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { createTrack, fetchArtists } from '../../http/trackAPI';
import './CreateTrack.scss';

const CreateTrack = observer(({show, onHide}) => {
    const {tracks} = useContext(Context)
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState('')

    useEffect(() => {
        fetchArtists().then(data => tracks.setArtists(data))
    }, [])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addTrack = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('file', file)
        formData.append('artistId', tracks.selectedArtist.id)
        formData.append('infomation', JSON.stringify(info))
        createTrack(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить трэк
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{tracks.selectedModalArtist.fullname || "Выберите артиста"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {tracks.artists.map(artist =>
                                <Dropdown.Item
                                    onClick={() => tracks.setSelectedModalArtist(artist)}
                                    key={artist.id}
                                >
                                    {artist.fullname}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название трэка"
                    />
                    <Form.Control
                        value={info}
                        onChange={e => setInfo(e.target.value)}
                        className="mt-3"
                        placeholder="Введите информацию о трэке"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addTrack}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateTrack;