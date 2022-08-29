import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextPage, prevPage } from '../../redux/actions';
import './Pagination.css';
export default function Pagination() {
	const pagination = useSelector((state) => state.pagination);
	const dispatch = useDispatch();
	const filteredDogs = useSelector((state) => state.filteredDogs);
	const onClickPagination = (event) => {
		if (event.target.innerHTML === '→') {
			dispatch(nextPage(filteredDogs, pagination));
		} else {
			dispatch(prevPage(filteredDogs, pagination));
		}
	};
	return (
		<div className="pagination">
			<div
				className={`${
					pagination.prev.length ? '' : 'disabled'
				} mainBtn circular `}
				onClick={onClickPagination}
			>
				&larr;
			</div>
			<div className="textPagination">
				Page {pagination.actualPage + 1} of {pagination.totalPages + 1}
			</div>
			<div
				className={`${
					pagination.next.length ? '' : 'disabled'
				} mainBtn circular `}
				onClick={onClickPagination}
			>
				&rarr;
			</div>
		</div>
	);
}
