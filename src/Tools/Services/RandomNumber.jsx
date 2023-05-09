const GetRandomNumberFromPSTTime = () => {
    const date = new Date();
    const pstOptions = { timeZone: 'America/Los_Angeles' };
    const pstTimeString = date.toLocaleString('en-US', pstOptions);
    const pstTime = new Date(pstTimeString);
    const randomNumber = pstTime.getTime();

    return randomNumber;
}
export { GetRandomNumberFromPSTTime };