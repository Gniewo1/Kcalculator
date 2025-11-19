/// CaloriesLimitPanel show/edit calories limit for given month

import "./Calendar.css";

const CaloriesLimitPanel = ({caloriesLimit,editing, newCalories, onEdit, onCancel, onSave, onChange}) => {
    
  return (
    <>
    <div className="panel-container">
      {caloriesLimit.length > 0 || editing ? (
        <>
          {!editing ? (
            <>
              <h2>Calories limit: {Math.round(caloriesLimit[0].calories_limit)} kcal</h2>
              <button className="panel-button" onClick={onEdit}>Edit calories limit</button>
            </>
          ) : (
            <>
            <div className="edit-container">
              <button className="panel-button" onClick={onCancel}>Back</button>
              <input
                className="form-input"
                type="number"
                value={newCalories}
                onChange={onChange}
              />
              <button className="panel-button" onClick={onSave}>Save</button>
              </div>
            </>
          )}
        </>
      ) : (
        <button className="panel-button" onClick={onEdit}>Add calories limit</button>
      )}
      </div>
    </>
  );
};

export default CaloriesLimitPanel;