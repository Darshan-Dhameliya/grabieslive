import { useEffect } from "react";
import { jsPDF } from "jspdf";

import React from "react";

export default function JsPdfmaker() {
  useEffect(() => {
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
    console.log(doc);
  }, []);
  return <div></div>;
}
