import axios from 'axios';
import {FETCH_JOBS} from './types';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

const JOB_ROOT_URL = "http://api.indeed.com/ads/apisearch?";

const JOB_QUERY_PARAMS = {
	publisher: '4201738803816157',
	format: 'json',
	v: '2',
	latlong: 1,
	radius: 10,
	q: 'javascript'
};

export const fetchJobs = (region) => async (dispatch) => {
	try {
		let zip = await reverseGeocode(region);

		let {data} = await axios.get(buildJobUrl(zip));
		   
		dispatch({type: FETCH_JOBS, payload: data})
	} catch(err) {
		console.error(err);
	}
}

const buildJobUrl = (zip) => {
	const query = qs.stringify({...JOB_QUERY_PARAMS, l: zip});

	return `${JOB_ROOT_URL}${query}`;
};