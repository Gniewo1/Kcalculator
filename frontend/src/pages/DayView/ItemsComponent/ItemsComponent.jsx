import { useEffect, useState } from "react";
import axios from 'axios';

export default function Itemscomponent ({ id, quantity, selectedOption, setSelectedOption, setQuantity }) {
    const [item, setItem] = useState('')

    useEffect(() => {
      if (!id) return;
      axios.get(`http://localhost:8000/item/item/${id}/`)
        .then((response) => {
          setItem(response.data);
        })
        .catch((err) => {
          console.error('Error fetching item details:', err);
        });
  }, [id]); // Re-run the effect when the `id` changes
    



    return (
    <>
      <div>
        {item.cal_in_gram && (
          <label style={{ display: "block" }}>
            <input
              type="radio"
              name="calories"
              value="gram"
              checked={selectedOption === "gram"}
              onChange={() => setSelectedOption("gram")}
            />
            <h3 style={{ display: "inline", marginLeft: "8px" }}>
              {item.cal_in_gram * 100} kcal in 100g
            </h3>
          </label>
        )}

        {item.cal_in_portion && (
          <label style={{ display: "block" }}>
            <input
              type="radio"
              name="calories"
              value="portion"
              checked={selectedOption === "portion"}
              onChange={() => setSelectedOption("portion")}
            />
            <h3 style={{ display: "inline", marginLeft: "8px" }}>
              {Math.round(item.cal_in_portion)} kcal in portion
            </h3>
          </label>
        )}
      </div>

      <div>
        <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="" />
        {selectedOption == "gram" && (<h3>grams ({Math.round(item.cal_in_gram*quantity)}kcal)</h3>)}
        {selectedOption == "portion" && (<h3>of portion ({Math.round(item.cal_in_portion*quantity)}kcal)</h3>)}
      </div>
    </>

    );
    };
