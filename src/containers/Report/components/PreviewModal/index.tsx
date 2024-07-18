import { Modal } from "antd";
import React from "react";

type PreviewModalPropsType = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  pdfUrl: string;
};

const PreviewModal: React.FC<PreviewModalPropsType> = ({
  isModalOpen,
  setIsModalOpen,
  pdfUrl,
}: PreviewModalPropsType) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handleOk}
      width="80vw"
      okText="Download Report"
    >
      <div className="h-[75vh] w-full flex justify-center items-center">
        <iframe src={pdfUrl} width="95%" height="95%" />
      </div>
    </Modal>
  );
};
export default PreviewModal;
