import { useEffect, useState } from "react";

export default function useFetch(url, requestOption = {}) {


    const [response, setResponse] = useState();

    useEffect(() => {
        fetch(url, requestOption)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                // console.log(response);
                return response.json();
            })
            .then((json) => {
                setResponse(json);
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, []);


    return response;
}