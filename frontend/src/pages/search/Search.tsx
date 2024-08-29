import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Search = () => {
	const [searchTerm, setSearchTerm] = useState<string | undefined>('');
	const [data, setData] = useState<any>({});

	const URL: string = 'https://api.themoviedb.org/3/search/multi/?';
    const APIKEY = import.meta.env.VITE_API_KEY_TMDB

	const handleSearchChange = (e: React.ChangeEvent<HTMLFormElement>) => {
		setSearchTerm(e.target.value);
		if (searchTerm?.length >= 3) {
			axios({
                    method: 'GET',
                    url: 'https://api.themoviedb.org/3/search/multi',
                    params: { query: searchTerm, include_adult: 'false', language: 'en-US', page: '1' },
                    headers: {
                        accept: 'application/json',
                        Authorization: APIKEY,
                    },
				})
				.then((res) => {
					console.log(res.data);
                    setData(() => res.data)
				})
				.catch((err) => {
					console.error('ERRO', err);
				});
		}
	};
	return (
		<>
			<main>
				<Input
					value={searchTerm}
					onChange={handleSearchChange}
				/>
                {data?.total_results}
			</main>
		</>
	);
};

export default Search;
