"use client";

import Content from "./content";

export default function CarsAll() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "80%",
      }}
    >
      <Content />
    </div>
  );
}
