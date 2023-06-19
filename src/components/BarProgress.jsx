import { useState, useEffect } from "react";

const ProgressBar = ({ target, current }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const calculatePercentage = () => {
      if (target > 0 && current > 0) {
        const percent = (current / target) * 100;
        setPercentage(percent);
      } else {
        setPercentage(0);
      }
    };

    calculatePercentage();
  }, [target, current]);

  return (
    <div className="w-full bg-gray-200  h-1.5 mt-2 ">
      <div className="bg-Teal text-xs  font-medium h-1.5  text-end max-w-[100%]" style={{ width: `${percentage}%` }}>
        {" "}
      </div>
    </div>
  );
};

export default ProgressBar;
