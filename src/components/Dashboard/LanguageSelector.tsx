import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const handleChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="lang-label">{t("language.label")}</InputLabel>
      <Select
        labelId="lang-label"
        value={i18n.language}
        onChange={handleChange}
        variant="outlined"
        size="small"
      >
        <MenuItem value="pt">🇧🇷 Português</MenuItem>
        <MenuItem value="en">🇺🇸 English</MenuItem>
        <MenuItem value="es">🇪🇸 Español</MenuItem>
      </Select>
    </FormControl>
  );
}
