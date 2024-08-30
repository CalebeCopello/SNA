import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { styleInput } from '../../constants/styles';

const Search = () => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>('');
	const [apiConfig, setApiConfig] = useState<any>({});
	const [data, setData] = useState<any | undefined>({});

	const APIKEY = import.meta.env.VITE_API_KEY_TMDB;

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
		if (searchTerm?.length >= 3) {
			axios({
				method: 'GET',
				url: 'https://api.themoviedb.org/3/search/multi',
				params: { query: searchTerm, language: 'en-US', page: '1' },
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
		}
	}, [searchTerm, APIKEY]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLFormElement>) => {
		setSearchTerm(e.target.value);
	};

	console.log(data);
	console.log(apiConfig);

	return (
		<>
			<div className='text-textColor'>
				<Input
					className={`${styleInput}`}
					placeholder='eg: Bananya'
					value={searchTerm}
					onChange={handleSearchChange}
				/>
				<div className=''>{`procurando por ${searchTerm}`}</div>
				{data?.total_results}
				{data?.results &&
					data.results.map((result: object, key: number) => {
						return (
							<div
								className='flex'
								key={key}
							>
								{result.media_type == 'person' && (
									<div className='mr-2'>
										<img
											src={`${apiConfig?.images.secure_base_url}${apiConfig?.images.poster_sizes[0]}${result.profile_path}`}
											alt='poster'
											className='rounded'
										/>
									</div>
								)}
								<div className='mr-2'>
									<img
										src={`${apiConfig?.images.secure_base_url}${apiConfig?.images.poster_sizes[0]}${result.poster_path}`}
										alt='poster'
										className='rounded'
									/>
								</div>

								<div className='border'>{result.media_type == 'movie' ? result.title : result.name}</div>
								<div className='border w-80 h-32 line-clamp-5 text-justify px-2'>{result.overview}</div>
								<div className='border'>{result.media_type == 'movie' ? result.release_date : result.first_air_date}</div>
							</div>
						);
					})}
			</div>
		</>
	);
};

export default Search;
