import {
  List,
  Datagrid,
  FunctionField,
  DeleteButton,
  EditButton,
  TopToolbar,
  CreateButton,
} from "react-admin";
import { Box, Chip, Typography } from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

export function RoomList() {
  return (
    <List
      actions={
        <TopToolbar>
          <CreateButton label="Nouvelle salle" />
        </TopToolbar>
      }
      sort={{ field: "name", order: "ASC" }}
      sx={{ "& .RaList-main": { boxShadow: "none" } }}
    >
      <Datagrid
        bulkActionButtons={false}
        sx={{
          "& .RaDatagrid-headerCell": {
            background: "#F8F9FF",
            color: "#475569",
            fontWeight: 700,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            borderBottom: "2px solid #DDE0EF",
          },
          "& .RaDatagrid-row:hover td": { background: "#F8F9FF" },
          "& .RaDatagrid-row td": {
            borderBottom: "1px solid #EEF1F7",
            padding: "12px 16px",
          },
        }}
      >
        <FunctionField
          label="Salle"
          render={(record) => (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  background: "rgba(108,99,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MeetingRoomIcon sx={{ fontSize: 16, color: "#6C63FF" }} />
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#0F172A" }}
              >
                {record.name}
              </Typography>
            </Box>
          )}
        />

        <FunctionField
          label="Sessions"
          render={(record) => {
            const count = record._count?.sessions ?? 0;
            return (
              <Chip
                label={`${count} session${count !== 1 ? "s" : ""}`}
                size="small"
                sx={{
                  background:
                    count > 0
                      ? "rgba(16,185,129,0.1)"
                      : "rgba(148,163,184,0.1)",
                  color: count > 0 ? "#10B981" : "#94A3B8",
                  fontWeight: 600,
                  fontSize: "0.72rem",
                  height: 22,
                }}
              />
            );
          }}
        />

        <EditButton label="" />
        <DeleteButton label="" mutationMode="pessimistic" />
      </Datagrid>
    </List>
  );
}
