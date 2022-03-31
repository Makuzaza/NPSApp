import {
  Button,
  Slider,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const FormButton = withStyles({
  root: {
    display: "block",
    "font-family": "'Alata', sans-serif",
    "font-size": "1.4rem",
    margin: "40px auto 0px",
    padding: "20px 80px",
  },
})(Button);

const LoginButton = withStyles({
  root: {
    background: "#F25278",
    color: "white",
    display: "block",
    "font-family": "'Alata', sans-serif",
    "font-size": "1.4rem",
    margin: "40px auto 0px",
    width: "90%",
  },
})(Button);

const StyledSlider = withStyles({
  root: {
    "margin-top": "40px",
  },
  markLabel: {
    "font-family": "'Alata', sans-serif",
    "font-size": "1.5rem",
  },
  valueLabel: {
    "font-family": "'Alata', sans-serif",
    "font-size": "1rem",
  },
})(Slider);

const TitleText = withStyles({
  root: {
    "font-family": "'Alata', sans-serif",
    "font-size": "2rem",
    margin: "30px 0",
  },
})(Typography);

const VotedLabel = withStyles({
  root: {
    "font-family": "'Alata', sans-serif",
    "font-size": "2rem",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "border-radius": "30px",
    padding: "20px 0",
    "background-color": "#edf7ed",
    color: "#1e4620",
    margin: "50px 0",
  },
})(Typography);

const HeaderText = withStyles({
  root: {
    "font-family": "'Alata', sans-serif",
    "font-size": "1.5rem",
    margin: "40px 0px 40px 0px",
  },
})(Typography);

const DialogHeader = withStyles({
  root: {
    "font-family": "'Alata', sans-serif",
    "font-size": "1.5rem",
  },
})(Typography);

const SubtitleText = withStyles({
  root: {
    "font-family": "'Alata', sans-serif",
    "font-size": "1.4rem",
    color: "lightgrey",
  },
})(Typography);



export {
  FormButton,
  LoginButton,
  StyledSlider,
  TitleText,
  VotedLabel,
  HeaderText,
  SubtitleText,
  DialogHeader,

};
