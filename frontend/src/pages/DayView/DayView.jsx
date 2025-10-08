import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from 'react';
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
  const [selectedItemEditId, setSelectedItemEditId] = useState('')   // Will take id of eatenitem which will edit
  const navigate = useNavigate();


  const totalCalories = useMemo(() => {
    return eatenItems.reduce((sum, item) => sum + (Number(item.calories) || 0), 0);
  }, [eatenItems]);


  // funckje do przycisków ADD EDIT DELETE

  const deleteItem = async (item) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(
        `http://localhost:8000/item/eaten-items/${item.id}/`,
        { 
          headers: {
            'Authorization': `Token ${token}`,
          },
        }
      );
      console.log('Deleted successfully', response.data);
    } catch (error) {
      console.error('Error deleting EatenItems', error);
    }
  fetchEatenItems();
  };

  

  const addItem = async () => {
    setNewOrEdit("new");
    setSelectedOption(null);
    setQuantity('');
    setSelectedItem('');
    setShowModal(true);
  }


  const editItem = (item) => {
    setNewOrEdit("edit");
    if (item.grams) {setSelectedOption("gram");}
    if (item.portion) {setSelectedOption("portion");}
    setSelectedItem(item.item_id);
    setQuantity(item.grams || item.portion);
    setSelectedItemEditId(item.id);
    setShowModal(true);
    
  }

  /// pobiera nazwy itemów
  const fetchEatenItems = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`http://localhost:8000/item/eaten-items/?date=${formattedDate}`, { 
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
        const response = await axios.post('http://localhost:8000/item/eaten-items/', 
          payload,
          {
        headers: {
          Authorization: `Token ${token}`,
        },
          }
        );
      } catch (error) {
        console.error("Saving item error:", error);
      }
    };

    const updateItem = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.put(`http://localhost:8000/item/eaten-items/${selectedItemEditId}/`, 
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

    if (newOrEdit === "new") {
        await postItem();
    }

    if (newOrEdit === "edit") {
        await updateItem();
    }



    
    // await postItem();
    fetchEatenItems();
    setShowModal(false);

  }; /// handleSubmit ending

  const changeDate = async (days) => {
    if (days == "back"){
      navigate('/');
    }else{
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + days);
    const newYear = date.getFullYear();
    const newMonth = (date.getMonth() + 1).toString().padStart(2, "0");
    const newDay = date.getDate().toString().padStart(2, "0");
    navigate(`/calendar/${newYear}/${newMonth}/${newDay}`);
    }
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

    <button onClick={() => {changeDate("back");}}>Back</button>
    <button onClick={() => {changeDate(-1);}}>Previous day</button>
    <button onClick={() => {changeDate(1);}}>Next day</button>

    <h1>DayView</h1>
    <h2>Year: {year}</h2>
    <h2>Month: {month}</h2>
    <h2>Day: {Number(day)}</h2>

    <button onClick={() => {addItem();}}>Add Item</button>

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
              <button>Add Item</button>
            )}

            {newOrEdit === "edit" && (
              <button>Update Item</button>
            )}
            {/* <button type="submit">Add</button> */}
            <button type="button" onClick={() => setShowModal(false)} style={{ marginLeft: "10px" }}>Cancel</button>

          </form>
        </div>
      </div>
    )}

    <EatenItemsComponent formattedDate={formattedDate} eatenItems={eatenItems} setEatenItems={setEatenItems} fetchEatenItems={fetchEatenItems} editItem={editItem} totalCalories={totalCalories}
      deleteItem={deleteItem}/>
    </>
  );
};

export default DayView;