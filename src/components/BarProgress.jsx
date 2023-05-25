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
    <div class="w-full bg-gray-200  h-1.5 mt-2 ">
      <div class="bg-Teal text-xs  font-medium h-1.5  text-end " style={{ width: `${percentage}%` }}>
        {" "}
      </div>
      <span className="text-Dark font-semibold text-xs text-start mt-0.5 ms-1">{Math.ceil(percentage)}%</span>
    </div>
  );
};

export default ProgressBar;
