import { useEffect } from 'react';
import axios from "axios";


export default function EatenItemscomponent ({formattedDate, eatenItems, setEatenItems, fetchEatenItems, editItem, totalCalories, deleteItem}) {
    

    useEffect(() => {
        fetchEatenItems();
    }, [formattedDate]);




    return(
        <>

        <div>
        <h2>Eaten items: </h2>
        <ul>
            {eatenItems.map((item) => (
            <li key={item.id}>
                {item.item_name} 
                {item.grams && ` – ${item.grams} g – ${Math.round(item.calories)} kcal`}
                {item.portion && ` – ${item.portion} portions – ${Math.round(item.calories)} kcal`}
                <button onClick={() => {editItem(item);}}>Edit</button>
                <button onClick={() => {deleteItem(item);}}>Delete</button>
            </li>
            ))}
        </ul>
        <h3>Total Calories: {totalCalories} kcal</h3>
        </div>

        </>
    );
};