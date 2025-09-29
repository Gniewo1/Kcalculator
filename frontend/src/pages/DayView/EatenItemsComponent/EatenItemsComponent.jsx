import { useEffect } from 'react';
import axios from "axios";


export default function EatenItemscomponent ({formattedDate, eatenItems, setEatenItems, date}) {
    

    useEffect(() => {
        console.log(formattedDate);
        const fetchEatenItems = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:8000/eaten-item/${formattedDate}/`, { // Example endpoint
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                setEatenItems(response.data);
            } catch (error) {
                console.error('Error fetching EatenItems', error);
            }
            };
        fetchEatenItems();
        console.log(eatenItems);
    }, []);

   const showDate = async () => {
        console.log(formattedDate);
        console.log(date);
    }

    return(
        <>
        <h1>Eaten Component</h1>
        <button onClick={() => showDate()}>Click</button>
        </>
    );
};