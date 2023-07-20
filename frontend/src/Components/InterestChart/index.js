// import "./styles.css";
import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
const interests = [
  { i_Key: "si_pg", i_Name: "公園綠地" },
  { i_Key: "si_os", i_Name: "戶外運動" },
  { i_Key: "si_tp", i_Name: "主題園區" },
  { i_Key: "si_ee", i_Name: "生態教育" },
  { i_Key: "si_ff", i_Name: "休閒農漁" },
  { i_Key: "si_la", i_Name: "在地藝文" },
  { i_Key: "si_le", i_Name: "地方展館" },
  { i_Key: "si_ns", i_Name: "自然景觀" },
  { i_Key: "si_np", i_Name: "夜市夜遊" },
  { i_Key: "si_rt", i_Name: "宗教廟宇" },
  { i_Key: "si_se", i_Name: "消費娛樂" },
  { i_Key: "si_ha", i_Name: "歷史古蹟" },
  { i_Key: "si_tf", i_Name: "觀光工廠" },
];


export default function InterestChart({ data }) {
  const formatData = interests.map((item) => ({
    subject: item.i_Name,
    score: data[item.i_Key] || 0,
    fullMark: 150,
  }));

  return (
    <RadarChart
      cx={300}
      cy={250}
      outerRadius={150}
      width={500}
      height={500}
      data={formatData}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis domain={[0, 10]} />
      <Radar
        name="Mike"
        dataKey="score"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
}
