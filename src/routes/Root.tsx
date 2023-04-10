import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

export const Root: React.FC = () => {
  useEffect(() => {
    const checkStatus = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_PATH}/health`);
      console.log(res.status);
    };

    checkStatus();
  }, []);

  return <Typography component="h2">This is the Root Page!</Typography>;
};
