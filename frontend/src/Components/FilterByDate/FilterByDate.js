import frLocale from "date-fns/locale/fr";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import enLocale from "date-fns/locale/en-US";
import MoreIcon from "@material-ui/icons/MoreVert";
import React, { useState, useCallback } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { TitleText } from "../StyledComponents";

const localeMap = {
  en: enLocale,
  fr: frLocale,
  ru: ruLocale,
};

function FilterByDate({ setFilterDate, filterDate }) {
  const [locale, setLocale] = useState("en");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = useCallback((e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }, []);

  const selectLocale = useCallback((locale) => {
    setLocale(locale);
    setAnchorEl(null);
  }, []);

  return (
    <div data-testid="filter-by-date">
      <TitleText>Filter By Date</TitleText>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
        <KeyboardDatePicker
          value={filterDate || new Date()}
          onChange={setFilterDate}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="Select locale"
                onClick={handleMenuOpen}
                aria-owns={anchorEl ? "locale-menu" : undefined}
              >
                <MoreIcon />
              </IconButton>
            ),
          }}
        />

        <Menu
          id="locale-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {Object.keys(localeMap).map((localeItem) => (
            <MenuItem
              key={localeItem}
              selected={localeItem === locale}
              onClick={() => selectLocale(localeItem)}
            >
              {localeItem}
            </MenuItem>
          ))}
        </Menu>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default FilterByDate;
