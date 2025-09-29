import { useEffect } from 'react';
import axios from "axios";


export default function EatenItemscomponent ({formattedDate, eatenItems, setEatenItems, fetchEatenItems, EditItem}) {
    

    useEffect(() => {
        fetchEatenItems();
    }, [formattedDate]);




    return(
        <>

        <div>
        <h2>Zjedzone produkty</h2>
        <ul>
            {eatenItems.map((item) => (
            <li key={item.id}>
                {item.item_name} 
                {item.grams && ` – ${item.grams} g – ${Math.round(item.calories)} kcal`}
                {item.portion && ` – ${item.portion} portions – ${Math.round(item.calories)} kcal`}
                <button onClick={() => {EditItem(item);}}>Edit</button>
            </li>
            ))}
        </ul>
        </div>

        </>
    );
};