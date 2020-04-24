// import db from '../api/db';


// export const getUsers = async () => {
// 	const response = await db.get(`/users`).then((res) => {
// 		return res.data
// 	})

// 	return { ..._.mapKeys(response.data, 'username') };
// }

export const isCurrentUser = (currentUser) => {
	const loggedUser = JSON.parse(localStorage.getItem('user'));
	if (currentUser._id === loggedUser._id) {
		return true;
	} else {
		return false;
	}

}
