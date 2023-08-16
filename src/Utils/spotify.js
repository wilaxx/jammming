
const getAccessToken = async () => {
    try {
        const response = await fetch('url', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials&client_id=58e94fb2fa6e4c598384c4b0ccb0d000&client_secret=7ba9519e55744946b61408ba8c439ffe"
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        }
        throw new Error('La requete a echoue !!');
    } catch (error) {
        console.log(error);
    }
};

export default getAccessToken;