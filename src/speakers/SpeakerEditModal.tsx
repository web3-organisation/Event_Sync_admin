import { useState } from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  useRedirect,
  useRecordContext,
} from "react-admin";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SpeakerTitle = () => {
  const record = useRecordContext();
  return <span>Modifier : {record ? record.fullName : ""}</span>;
};

export const SpeakerEditModal = () => {
  const [open, setOpen] = useState(true);
  const redirect = useRedirect();

  const handleClose = () => {
    setOpen(false);
    redirect("list", "speakers");
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <IconButton
        onClick={handleClose}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ pt: 4 }}>
        <Edit
          resource="speakers"
          redirect={false}
          title={<SpeakerTitle />}
          mutationOptions={{ onSuccess: handleClose }}
        >
          <SimpleForm>
            <TextInput
              source="fullName"
              label="Nom complet"
              validate={required()}
              fullWidth
            />
            <TextInput source="photoUrl" label="URL de la photo" fullWidth />
            <TextInput source="bio" label="Bio" multiline rows={4} fullWidth />
          </SimpleForm>
        </Edit>
      </DialogContent>
    </Dialog>
  );
};
