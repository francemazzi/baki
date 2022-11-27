import React from "react";
import Category from "../../atoms/Category";
import { NAMES_CATEGORY } from "../../../common/costants";

const CategoryBar: React.FC = () => {
  return (
    <div className="flex flex-row items-center lg:justify-center overflow-x-scroll">
      {NAMES_CATEGORY[0].category.map((id, i) => {
        return (
          <div key={i}>
            <Category
              icon={id.icon}
              label={id.label}
              onClick={() => {
                console.log("novità");
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CategoryBar;
