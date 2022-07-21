import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";
import './Pagination.scss';

const PaginationComponent = observer(() => {
    const {tracks} = useContext(Context);
    const pageCount = Math.ceil(tracks.totalCount / tracks.limit)
    let pages = []
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination>
            <Pagination.First onClick={() => tracks.setPage(1)}/>
            <Pagination.Prev onClick={() => tracks.setPage(tracks.page-1)}/>
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={tracks.page === page}
                    onClick={() => tracks.setPage(page)}
                    className='mr-2'
                >
                    {page}
                </Pagination.Item>
            )}
            <Pagination.Next onClick={() => tracks.setPage(tracks.page+1)}/>
            <Pagination.Last onClick={() => tracks.setPage(pages.length)}/>
        </Pagination>
    );
});

export default PaginationComponent;