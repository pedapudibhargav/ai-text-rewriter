const GetUserDetails = () => {
    let userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
        return JSON.parse(userDetails);
    } else {
        console.error('User details not found');
        return null;
    }
};

const registerNewuser = (userDetails) => {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
};
export { registerNewuser , GetUserDetails}
