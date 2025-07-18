import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="language-label">{t("language.label")}</InputLabel>
      <Select
        labelId="language-label"
        value={i18n.language}
        onChange={handleLanguageChange}
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
