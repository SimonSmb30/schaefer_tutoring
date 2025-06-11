"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

const CrispChat = () => {
  useEffect(() => {
    // Commented out Crisp initialization to prevent errors
    // Crisp.configure(process.env.NEXT_PUBLIC_CRISP_ID!);
    console.log("Crisp chat initialization disabled");
  }, []);
  return null;
};

export default CrispChat;