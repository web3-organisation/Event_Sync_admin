import {
  Show,
  SimpleShowLayout,
  TextField,
  useRecordContext,
} from "react-admin";
import { Avatar, Box, Chip, Typography, Divider } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

// ─── Biographie ────────────────────────────────────────────────────────────────
const SpeakerBio = () => {
  const record = useRecordContext();
  if (!record?.bio) {
    return (
      <Typography
        sx={{ color: "#94A3B8", fontStyle: "italic", fontSize: "0.88rem" }}
      >
        Aucune biographie.
      </Typography>
    );
  }
  return (
    <Typography sx={{ color: "#334155", lineHeight: 1.7, fontSize: "0.9rem" }}>
      {record.bio as string}
    </Typography>
  );
};

// ─── Liens ────────────────────────────────────────────────────────────────────
const SpeakerLinks = () => {
  const record = useRecordContext();
  const links = record?.speakerLinks as Array<{
    id: string;
    label: string;
    url: string;
  }>;

  if (!links?.length) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        sx={{
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "#94A3B8",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          mb: 1,
        }}
      >
        Liens
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
        {links.map((l) => (
          <Chip
            key={l.id}
            label={l.label}
            icon={<LinkIcon sx={{ fontSize: "0.85rem !important" }} />}
            size="small"
            component="a"
            href={l.url}
            target="_blank"
            clickable
            sx={{
              background: "rgba(108,99,255,0.08)",
              color: "#6C63FF",
              fontWeight: 600,
              fontSize: "0.75rem",
              "&:hover": { background: "rgba(108,99,255,0.16)" },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

// ─── Header du profil ─────────────────────────────────────────────────────────
const SpeakerHeader = () => {
  const record = useRecordContext();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        p: 3,
        background: "linear-gradient(135deg, #6C63FF12, #EC489912)",
        borderRadius: "16px 16px 0 0",
        mb: 3,
      }}
    >
      <Avatar
        src={record?.photoUrl as string}
        alt={record?.fullName as string}
        sx={{
          width: 72,
          height: 72,
          background: "linear-gradient(135deg, #6C63FF, #EC4899)",
          fontSize: "1.8rem",
          fontWeight: 700,
          border: "3px solid white",
          boxShadow: "0 8px 24px rgba(108,99,255,0.25)",
        }}
      >
        {(record?.fullName as string)?.[0]?.toUpperCase()}
      </Avatar>
      <Box>
        <Typography
          sx={{
            fontSize: "1.4rem",
            fontWeight: 800,
            color: "#0F172A",
            fontFamily: "'Bricolage Grotesque', sans-serif",
            lineHeight: 1.2,
          }}
        >
          {record?.fullName as string}
        </Typography>
      </Box>
    </Box>
  );
};

// ─── SpeakerShow ──────────────────────────────────────────────────────────────
export const SpeakerShow = () => (
  <Show
    sx={{ "& .RaShow-main": { boxShadow: "none", maxWidth: 640, mx: "auto" } }}
  >
    <SimpleShowLayout
      sx={{ background: "transparent", p: 0, "& .RaLabeled-root": { mb: 2 } }}
    >
      <SpeakerHeader />
      <Box sx={{ px: 1 }}>
        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#94A3B8",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            mb: 0.5,
          }}
        >
          Biographie
        </Typography>
        <SpeakerBio />
        <Divider sx={{ my: 2.5, borderColor: "#EEF1F7" }} />
        <TextField source="photoUrl" label="URL Photo" />
        <SpeakerLinks />
      </Box>
    </SimpleShowLayout>
  </Show>
);
