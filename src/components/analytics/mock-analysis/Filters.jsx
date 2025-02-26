"use client"
import { useState } from "react";

const Filters = ({ title, options }) => {
  const [checkedItems, setCheckedItems] = useState(
    options.reduce((acc, option) => ({ ...acc, [option]: false }), { all: false })
  );

  const handleMainCheckboxChange = () => {
    const newChecked = !checkedItems.all;
    setCheckedItems(
      Object.fromEntries(Object.keys(checkedItems).map((key) => [key, newChecked]))
    );
  };

  const handleSubCheckboxChange = (option) => {
    const updatedChecked = { ...checkedItems, [option]: !checkedItems[option] };
    updatedChecked.all = options.every((opt) => updatedChecked[opt]);
    setCheckedItems(updatedChecked);
  };

  return (
    <div className="flex flex-col gap-3 shadow-md p-3 rounded-md">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checkedItems.all}
          onChange={handleMainCheckboxChange}
        />
        <label className="font-semibold">{title}</label>
      </div>
      <div className="flex gap-3 flex-wrap space-x-3">
        {options.map((option) => (
          <div key={option} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checkedItems[option]}
              onChange={() => handleSubCheckboxChange(option)}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
