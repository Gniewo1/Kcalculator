import { useEffect } from 'react';
import axios from "axios";


export default function EatenItemscomponent ({formattedDate, eatenItems, setEatenItems}) {
    

    useEffect(() => {
        const fetchEatenItems = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:8000/item/eaten-item/${formattedDate}/`, { 
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                });
                console.log(response.data);
                setEatenItems(response.data);
            } catch (error) {
                console.error('Error fetching EatenItems', error);
            }
            };
        fetchEatenItems();
    }, [formattedDate]);

    // const showData = async () => {
    //     console.log(eatenItems);
    // }


    return(
        <>
        <h1>Eaten Component</h1>

        <div>
        <h2>Zjedzone produkty</h2>
        <ul>
            {eatenItems.map((item) => (
            <li key={item.id}>
                {item.item_name} 
                {item.grams && ` – ${item.grams} g – ${Math.round(item.grams * item.item_cal_gram)} kcal`}
                {item.portion && ` – ${item.portion} portions – ${Math.round(item.portion*item.item_cal_portion)} kcal`}
                {/* {item.portion && ` – ${item.portion} portions`}  */}
            </li>
            ))}
        </ul>
        </div>
        {/* <button onClick={() => showData()}></button> */}

        </>
    );
};