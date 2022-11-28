import React from "react";

type CategoryType = {
  icon: string;
  label: string;
  onClick: () => void;
};

const Category: React.FC<CategoryType> = ({ icon, label }) => {
  return (
    <div className=" flex flex-col items-center justify-center  rounded-md m-[5px] p-[10px] cursor-pointer">
      <div>{icon}</div>
      <div>{label}</div>
    </div>
  );
};

export default Category;
