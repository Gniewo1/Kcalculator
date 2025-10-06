import { useEffect } from 'react';
import axios from "axios";


export default function EatenItemscomponent ({formattedDate, eatenItems, setEatenItems, fetchEatenItems, editItem, totalCalories, deleteItem}) {
    

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
                <button onClick={() => {DeleteItem(item);}}>Delete</button>
            </li>
            ))}
        </ul>
        <h3>Łączna liczba kalorii: {totalCalories} kcal</h3>
        </div>

        </>
    );
};