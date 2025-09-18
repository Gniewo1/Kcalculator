import { useParams } from "react-router-dom";
import { useState } from "react";

const DayView = () => {
  const { year, month, day } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    alert(`Title: ${formData.title}\nDescription: ${formData.description}`);
    setFormData({ title: "", description: "" });
    setShowModal(false);
  };

  return (
    <>
      <h1>DayView</h1>
      <h2>Year: {year}</h2>
      <h2>Month: {month}</h2>
      <h2>Day: {day}</h2>

      <button onClick={() => setShowModal(true)}>Add Item</button>

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
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <br /><br />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />
              <br /><br />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setShowModal(false)} style={{ marginLeft: "10px" }}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DayView;