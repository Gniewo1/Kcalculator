import { useEffect, useState } from "react";
import axios from 'axios';

export default function Itemscomponent ({ id }) {
    const [name, setName] = useState('')
    const []





    useEffect(() => {
    if (!id) return; // If no id is provided, don't fetch

    // setLoading(true);
    // setError(null);

    // Fetch race details using the provided `id`
    axios
      .get(`http://localhost:8000/item/item/${id}/`)
      .then((response) => {
        chooseBonus(response.data.choose_bonus);
        setRaceDetails(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching race details:', err);
        setError('Failed to load race details.');
        setLoading(false);
      });
  }, [id]); // Re-run the effect when the `id` changes
    



    return (
        <>
        <h1>Itemcomponent</h1>
        <h1>{id}</h1>
        </>

    );
    };
