import React from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import {Bar} from "@/components/Charts";

const data = [
  {genre: "Sports", sold: 275, income: 2300},
  {genre: "Strategy", sold: 115, income: 667},
  {genre: "Action", sold: 120, income: 982},
  {genre: "Shooter", sold: 350, income: 5271},
  {genre: "Other", sold: 150, income: 3710},
];

const data2 = data.map(item => {
  return {x: item.genre, y: item.sold};
});

export default () => {
  return (
    <PageHeaderWrapper
      title={"Data Analysis"}
      content={"Bar chart"}
      extraContent={"Bar chart"}
    >
      <div style={{backgroundColor: "#FFF", width: "600px"}}>
        <Bar
          title={"Title"}
          data={data2}
          height={400}
        />
      </div>
    </PageHeaderWrapper>
  );
};
