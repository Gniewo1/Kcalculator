const CaloriesLimitPanel = ({caloriesLimit,editing, newCalories, onEdit, onCancel, onSave, onChange}) => {
    
  return (
    <>
      {caloriesLimit.length > 0 || editing ? (
        <>
          {!editing ? (
            <>
              <h2>Calories limit: {Math.round(caloriesLimit[0].calories_limit)} kcal</h2>
              <button onClick={onEdit}>Edit calories limit</button>
            </>
          ) : (
            <>
              <button onClick={onCancel}>Back</button>
              <input
                type="number"
                value={newCalories}
                onChange={onChange}
              />
              <button onClick={onSave}>Save</button>
            </>
          )}
        </>
      ) : (
        <button onClick={onEdit}>Add calories limit</button>
      )}
    </>
  );
};

export default CaloriesLimitPanel;