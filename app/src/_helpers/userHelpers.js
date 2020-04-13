import _ from 'lodash';

import db from '../api/db';


export const getUsers = async () => {
	const response = await db.get(`/users`).then((res) => {
		return res.data
	})

	return { ..._.mapKeys(response.data, 'username') };
}
