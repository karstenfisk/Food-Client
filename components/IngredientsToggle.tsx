"use client";
import React, { useState } from "react";
import instance from "@/instance";
import { Switch, Collapse, Card, CardBody } from "@material-tailwind/react";

const IngredientsToggle = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="mt-4 p-4 space-y-2 shadow-md w-100 rounded-lg border border-gray-200 h-auto">
      <Switch
        checked={open}
        onChange={() => setOpen(!open)}
        id="auto-update"
        label="Use your ingredients?"
      />
      <Collapse open={open}>
        <div>Select ingredients you would like to exclude.</div>
      </Collapse>
    </div>
  );
};
export default IngredientsToggle;
