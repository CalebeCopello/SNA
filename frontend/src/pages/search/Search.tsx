import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

import { GrDocumentMissing } from 'react-icons/gr';
import { BiSolidTv } from 'react-icons/bi';
import { MdLocalMovies } from 'react-icons/md';
import { IoPersonSharp } from 'react-icons/io5';

import { styleBoxBorder, styleButton } from '../../constants/styles';

import Navbar from '../../components/Navbar';

const Search = () => {
	console.log('render page')
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchTerm, setSearchTerm] = useState<string | null>('');
	const [apiConfig, setApiConfig] = useState<any>({});
	const [data, setData] = useState<any | undefined>({});
	const [page, setPage] = useState<number>(1);
	const [paginationArray, setPaginationArray] = useState<number[]>([page]);
	const navigate = useNavigate();

	const APIKEY = import.meta.env.VITE_API_KEY_TMDB;
	const stylePoster: string = `rounded-l border-2 border-color05 shadow h-[135px] w-[96px] min-w-[96px]`;
	const styleResultDiv: string = `border-2 border-l-0 rounded-r px-1 grid grid-rows-3 place-content-right border-color05 w-full md:w-[400px]`;

	useEffect(() => {
		axios({
			method: 'GET',
			url: 'https://api.themoviedb.org/3/configuration',
			headers: {
				accept: 'application/json',
				Authorization: APIKEY,
			},
		})
			.then((res) => {
				// console.log(res.data);
				setApiConfig(() => res.data);
			})
			.catch((res) => {
				console.error('Error Config: ', res);
			});
	}, [APIKEY]);

	useEffect(() => {
		setSearchTerm(searchParams.get('query'));
		axios({
			method: 'GET',
			url: 'https://api.themoviedb.org/3/search/multi',
			params: { query: searchTerm, language: 'en-US', page: page },
			headers: {
				accept: 'application/json',
				Authorization: APIKEY,
			},
		})
			.then((res) => {
				// console.log(res.data);
				setData(() => res.data);
			})
			.catch((err) => {
				console.error('Error Query: ', err);
			});
	}, [searchTerm, APIKEY, searchParams, page]);

	useEffect(() => {
		pagesArray();
	}, [page]);

	const handleDetails = (e: number) => {
		console.log(e);
	};

	const formattedDate = (date: any) => {
		const formatted = date
			? new Date(date?.split('-')[0], date?.split('-')[1] - 1, date?.split('-')[2]).toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric',
			  })
			: 'Not Found';
		return formatted;
	};

	const paginationComponent = () => {
		return (
			<Pagination className={`list-none`}>
				<PaginationItem>
					<PaginationPrevious
						className={`cursor-pointer`}
						onClick={() => setPage((prev: number | undefined) => (prev - 1 > 0 ? prev - 1 : prev))}
					/>
				</PaginationItem>
				{data?.total_pages &&
					paginationArray.map((_, key) => (
						<PaginationItem key={key}>
							<PaginationLink className={`cursor-pointer`} onClick={() => setPage(() => paginationArray[key])}> <span className={`${page == paginationArray[key] ? `border` : ``}  rounded p-1 w-full text-center`}>
								{paginationArray[key]}
								</span>
								</PaginationLink>
						</PaginationItem>
					))}
				<PaginationItem>
					<PaginationNext
						onClick={() => setPage((prev: number | undefined) => (prev + 1 <= data?.total_pages ? prev + 1 : prev))}
						className={`cursor-pointer`}
					/>
				</PaginationItem>
			</Pagination>
		);
	};

	const pagesArray = () => {
		const total: number[] = [];
		for (let i: number = 1; i <= data?.total_pages; i++) {
			total.push(i);
		}
		const pagination: number[] = [page];
		let i: number = 1;
		while (i <= 7) {
			if (page + i <= data?.total_pages && pagination.length < 7) pagination.push(page + i);
			if (page + i * -1 > 0 && pagination.length < 7) pagination.unshift(page + i * -1);
			i++;
		}
		setPaginationArray(() => pagination);
	};

	return (
		<>
			<Navbar />
			<main className={`${styleBoxBorder} text-textColor flex-row  mx-4 p-2`}>
				<div className=''>{`procurando por ${searchTerm ? searchTerm : 'no term defined'}`}</div>
				<div className=''>{`total resultas ${data?.total_results}`}</div>
				<div className=''>{`total pages ${data?.total_pages}`}</div>
				<div className='flex-row mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-2 place-content-around max-w-[1510px]'>
					{data?.results &&
						data.results.map((result: object, key: number) => {
							return (
								<div
									className='flex my-4 md:my-0 w-full mx-auto '
									key={key}
								>
									{result.media_type == 'tv' && (
										<>
											{result.poster_path != null ? (
												<img
													src={`${apiConfig?.images.secure_base_url}${apiConfig?.images.poster_sizes[0]}${result.poster_path}`}
													alt='poster'
													className={`${stylePoster}`}
												/>
											) : (
												<div className={`${stylePoster} flex bg-background`}>
													<div className='m-auto'>
														<GrDocumentMissing className='text-textColor m-auto text-[28px]' />
														<span className='text-sm text-textColor font-bold'>Not found</span>
													</div>
												</div>
											)}
											<div className={styleResultDiv}>
												<div className='truncate text-sm font-semibold border-b border-color10  flex'>
													<div className='m-auto'>{result.name}</div>
												</div>
												<div className='flex text-sm border-b border-color10'>
													<div className='my-auto'>
														<div className='flex'>
															<BiSolidTv className='my-auto mr-2 text-[36px]' />
															<span className='text-xs my-auto'>First Air Date: {formattedDate(result.first_air_date)}</span>
														</div>
													</div>
												</div>
												<div className={`flex py-2`}>
													<div
														className={` ${styleButton} w-full h-full text-sm font-bold hover:cursor-pointer flex`}
														onClick={() => handleDetails(result.id)}
													>
														<div className='m-auto '>More Details</div>
													</div>
												</div>
											</div>
										</>
									)}
									{result.media_type == 'movie' && (
										<>
											{result.poster_path != null ? (
												<img
													src={`${apiConfig?.images.secure_base_url}${apiConfig?.images.poster_sizes[0]}${result.poster_path}`}
													alt='poster'
													className={`${stylePoster}`}
												/>
											) : (
												<div className={`${stylePoster} flex bg-background`}>
													<div className='m-auto'>
														<GrDocumentMissing className='text-color m-auto text-[28px]' />
														<span className='text-sm text-textColor font-bold'>Not found</span>
													</div>
												</div>
											)}
											<div className={styleResultDiv}>
												<div className='truncate text-sm font-semibold border-b border-color10  flex'>
													<div className='m-auto'>{result.title}</div>
												</div>
												<div className='flex text-sm border-b border-color10'>
													<div className='my-auto'>
														<div className='flex'>
															<MdLocalMovies className='my-auto mr-2 text-[36px]' />
															<span className='text-xs my-auto'>Release Date: {formattedDate(result.release_date)}</span>
														</div>
													</div>
												</div>
												<div className={`flex py-2`}>
													<div
														className={` ${styleButton} w-full h-full text-sm font-bold hover:cursor-pointer flex`}
														onClick={() => handleDetails(result.id)}
													>
														<div className='m-auto '>More Details</div>
													</div>
												</div>
											</div>
										</>
									)}
									{result.media_type == 'person' && (
										<>
											{result.profile_path != null ? (
												<img
													src={`${apiConfig?.images.secure_base_url}${apiConfig?.images.poster_sizes[0]}${result.profile_path}`}
													alt='poster'
													className={`${stylePoster}`}
												/>
											) : (
												<div className={`${stylePoster} flex bg-background`}>
													<div className='m-auto'>
														<GrDocumentMissing className='text-textColor m-auto text-[28px]' />
														<span className='text-sm text-textColor font-bold'>Not found</span>
													</div>
												</div>
											)}
											<div className={styleResultDiv}>
												<div className='truncate text-sm font-semibold border-b border-color10  flex'>
													<div className='m-auto'>{result.name}</div>
												</div>
												<div className='flex text-sm border-b border-color10'>
													<div className='my-auto'>
														<div className='flex'>
															<IoPersonSharp className='my-auto mr-2 text-[36px]' />
															<span className='text-xs my-auto'>Known for: {result.known_for_department}</span>
														</div>
													</div>
												</div>
												<div className={`flex py-2`}>
													<div
														className={` ${styleButton} w-full h-full text-sm font-bold hover:cursor-pointer flex`}
														onClick={() => handleDetails(result.id)}
													>
														<div className='m-auto '>More Details</div>
													</div>
												</div>
											</div>
										</>
									)}
								</div>
							);
						})}
				</div>
				<div>{paginationComponent()}</div>
			</main>
		</>
	);
};

export default Search;
