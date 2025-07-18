import { Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      variant="outlined"
      size="small"
      sx={{
        minWidth: 120,
        height: 36,
        borderRadius: 2,
        bgcolor: "#f7f9fc",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        "& fieldset": { border: "none" },
      }}
    >
      <MenuItem value="pt">🇧🇷 Português</MenuItem>
      <MenuItem value="en">🇺🇸 English</MenuItem>
      <MenuItem value="es">🇪🇸 Español</MenuItem>
    </Select>
  );
}
