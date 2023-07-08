import { Modal, Typography, Box, Stack, Button } from "@mui/material";

import React, {
  useState,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import CancelButton from "../../Button/CancelButton";
import DangerButton from "../../Button/DangerButton";
import deleteItineraryAPI from "../../../util/apis/deleteItinerary";
import ItineraryListContext from "../../../contexts/ItineraryListContext";

import { produce } from "immer";

const DeleteConfirmModal = forwardRef(({ t_Id, setAnchorEl }, ref) => {
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  const { itineraryList, setItineraryList } = useContext(ItineraryListContext);

  // console.log(itineraryList, setItineraryList);
  // console.log(props, ref);
  useImperativeHandle(ref, () => ({
    openDeleteConfirmModal() {
      // console.log("111");
      setDeleteConfirmModalOpen(true);
    },
    closeDeleteConfirmModal() {
      // console.log("222");
      setDeleteConfirmModalOpen(false);
    },
  }));

  return (
    <Modal
      open={deleteConfirmModalOpen}
      onClose={() => {
        ref.current.closeDeleteConfirmModal();
      }}
      aria-labelledby="itinerary delete confirm"
      aria-describedby="sure to delete itinerary ?"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          // border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          刪除行程表
        </Typography>
        <Typography variant="h6" gutterBottom>
          確定要刪除行程表?此動作不可回復
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <CancelButton
            variant="contained"
            onClick={() => {
              ref.current.closeDeleteConfirmModal();
              setAnchorEl(null);
            }}
          >
            取消
          </CancelButton>
          <DangerButton
            variant="contained"
            onClick={() => {
              ref.current.closeDeleteConfirmModal();

              //delete the itinerary
              // deleteItineraryAPI("url", "data");
              const nextState = produce(itineraryList, (draftState) => {
                const index = draftState.findIndex(
                  (itinerary) => itinerary.t_Id === t_Id
                );
                if (index !== -1) {
                  draftState.splice(index, 1);
                }
              });

              setItineraryList(nextState);
            }}
          >
            確定
          </DangerButton>
        </Stack>
      </Box>
    </Modal>
  );
});

export default DeleteConfirmModal;
