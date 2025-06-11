const DoanloadButton = () => {
  const downloadPDF = (publicId: string) => {
    const link = document.createElement("a");
    link.href = `/api/download-receipt?publicId=${encodeURIComponent(publicId)}`;
    link.download = ""; // this tells the browser it's a download
    link.click();
  };
  return (
    <button
      onClick={() =>
        downloadPDF("payment_receipts/receipt_123_456_1616161616161")
      }
    >
      Download PDF
    </button>
  );
};

export default DoanloadButton;
