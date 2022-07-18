import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const PaginationComponent = observer(() => {
    const {tracks} = useContext(Context);
    console.log(tracks.limit)
    const pageCount = Math.ceil(tracks.totalCount / tracks.limit)
    let pages = []
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-3">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={tracks.page === page}
                    onClick={() => tracks.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default PaginationComponent;