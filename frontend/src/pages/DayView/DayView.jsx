import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import ItemsComponent from "./ItemsComponent/ItemsComponent";
import EatenItemsComponent from "./EatenItemsComponent/EatenItemsComponent";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

const DayView = () => {
  const { year, month, day } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('')
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [userId, setUserId] = useState(null);
  const formattedDate = [year, String(month).padStart(2, "0"), String(day).padStart(2, "0"),].join("-");
  const [eatenItems, setEatenItems] = useState([]);
  const [newOrEdit, setNewOrEdit] = useState('')

  const AddItem = async () => {
    setNewOrEdit("new");
    setSelectedOption(null);
    setQuantity('');
    setSelectedItem('');
    setShowModal(true);
  }

  const handleUpdate = () => {

  }
  const handleAdd = () => {
    
  }

  const EditItem = (item) => {
    setNewOrEdit("edit");
    if (item.grams) {setSelectedOption("gram");}
    if (item.portion) {setSelectedOption("portion");}
    setSelectedItem(item.item_id);
    setQuantity(item.grams || item.portion);
    setShowModal(true);
    
  }


  const fetchEatenItems = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`http://localhost:8000/item/eaten-item/${formattedDate}/`, { 
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        setEatenItems(response.data);
    } catch (error) {
        console.error('Error fetching EatenItems', error);
    }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user: userId,
      item: selectedItem,
      date: formattedDate,
      ...(selectedOption === "gram" ? { grams: quantity } : {}),
      ...(selectedOption === "portion" ? { portion: quantity } : {})
    };
    
    const postItem = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post('http://localhost:8000/item/eaten-item/', 
          payload,
          {
        headers: {
          Authorization: `Token ${token}`,
        },
          }
        );
      } catch (error) {
        console.error("Błąd przy zapisywaniu itemu:", error);
      }
    };
    await postItem();
    fetchEatenItems();
    setShowModal(false);
  };

  useEffect(() => {


    const fetchUserId = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/auth/user/', { // Example endpoint
            headers: {
                'Authorization': `Token ${token}`,
            },
        });
        setUserId(response.data.id); // Assuming the response contains user ID
      } catch (error) {
          console.error('Error fetching user ID', error);
      }
    };

    fetchUserId();

    fetch('http://localhost:8000/item/item-names/')
    .then((res) => res.json())
    .then((data) => setItems(data))
    .catch((err) => console.error('Error fetching items:', err));

    

  }, []);

  return (
    <>
    <Navbar/>
      <h1>DayView</h1>
      <h2>Year: {year}</h2>
      <h2>Month: {month}</h2>
      <h2>Day: {day}</h2>

      <button onClick={() => {AddItem();}}>Add Item</button>

      {showModal && (
        <div style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            minWidth: "300px",
          }}>
            <h3>Add New Item</h3>
            <form onSubmit={handleSubmit}>

              <label>
              <select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                required
                className="styled-select"
              >
                <option value="">-- Select Item --</option>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            {selectedItem && <ItemsComponent id={selectedItem} selectedOption={selectedOption} setSelectedOption={setSelectedOption} quantity={quantity} setQuantity={setQuantity}/>}

              <br /><br />
              {newOrEdit === "new" && (
                <button onClick={handleAdd}>Add Item</button>
              )}

              {newOrEdit === "edit" && (
                <button onClick={handleUpdate}>Update Item</button>
              )}
              {/* <button type="submit">Add</button> */}
              <button type="button" onClick={() => setShowModal(false)} style={{ marginLeft: "10px" }}>Cancel</button>

            </form>
          </div>
        </div>
      )}

      <EatenItemsComponent   formattedDate={formattedDate} eatenItems={eatenItems} setEatenItems={setEatenItems} fetchEatenItems={fetchEatenItems} EditItem={EditItem}/>
    </>
  );
};

export default DayView;