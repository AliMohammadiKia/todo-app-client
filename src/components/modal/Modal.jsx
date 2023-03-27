import { Modal, Box } from "@mui/material";

export const ModalComponent = ({ openModal, handleCloseModal, children }) => {
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: "0.5rem",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};
