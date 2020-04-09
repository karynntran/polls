import _ from 'lodash';

import db from '../api/db';


export const getUsers = async () => {
	const response = await db.get(`/testUsers`).then((res) => {
		return res
	})

	return { ..._.mapKeys(response.data, 'username') };
}
