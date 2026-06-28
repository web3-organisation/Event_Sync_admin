import { useState } from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  useRedirect,
} from "react-admin";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const SpeakerCreateModal = () => {
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
        <Create
          resource="speakers"
          redirect={false}
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
        </Create>
      </DialogContent>
    </Dialog>
  );
};
