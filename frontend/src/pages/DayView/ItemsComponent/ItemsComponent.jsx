import { useEffect, useState } from "react";
import axios from 'axios';

export default function Itemscomponent ({ id }) {
    const [item, setItem] = useState('')





    useEffect(() => {
    if (!id) return; // If no id is provided, don't fetch

    // setLoading(true);
    // setError(null);

    // Fetch race details using the provided `id`
    axios
      .get(`http://localhost:8000/item/item/${id}/`)
      .then((response) => {
        setItem(response.data);
        // setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching item details:', err);
        // setError('Failed to load race details.');
        // setLoading(false);
      });
  }, [id]); // Re-run the effect when the `id` changes
    



    return (
        <>
        <div>
          <h2>Calories in 100g</h2>
          <h2>{item.cal_in_gram*100}</h2>
        </div>
        <div>
          <h2>Calories in portion</h2>
          <h2>{item.cal_in_portion}</h2>
        </div>
        </>

    );
    };
