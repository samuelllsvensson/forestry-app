import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import Edit from "@material-ui/icons/Edit";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grow",
    flexWrap: "wrap",
    marginLeft: "auto",
    marginRight: "auto",
  },
  textField: {
    width: "100%",
    color: "black",
    opacity: 1,
    borderBottom: 0,
    "&:before": {
      borderBottom: 0,
    },
  },
  disabled: {
    color: "black",
    borderBottom: 0,
    "&:before": {
      borderBottom: 0,
    },
  },
}));

const EditableTextArea = ({ editableData, name, value }) => {
  const classes = useStyles();
  const [path, setPath] = useState(name);

  const [data, setData] = useState(value);
  const [editMode, setEditMode] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  const handleChange = (event) => {
    setData(event.target.value);
  };

  const handleMouseOver = (event) => {
    if (!mouseOver) {
      setMouseOver(true);
    }
  };

  const handleMouseOut = (event) => {
    if (mouseOver) {
      setMouseOver(false);
    }
  };

  const handleClick = () => {
    setEditMode(true);
    setMouseOver(false);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    if (!path) {
      setPath(path);
    }
    editableData(data, path);
  };

  const handleEdit = () => {
    if (mouseOver && !editMode) {
      return (
        <InputAdornment position="end">
          <IconButton onClick={handleClick}>
            <Edit />
          </IconButton>
        </InputAdornment>
      );
    } else if ((editMode && !mouseOver) || (editMode && mouseOver)) {
      return (
        <InputAdornment position="end">
          <IconButton onClick={handleSaveClick}>
            <DoneIcon />
          </IconButton>
        </InputAdornment>
      );
    } else if (!mouseOver) {
      return "";
    }
  };

  return (
    <div className={classes.container}>
      <TextField
        name="text"
        value={data}
        margin="none"
        error={data === ""}
        type="text"
        onChange={handleChange}
        disabled={!editMode}
        className={classes.textField}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        label={"Anteckningar"}
        multiline
        rows={2}
        rowsMax={4}
        InputProps={{
          classes: {
            disabled: classes.disabled,
          },
          endAdornment: handleEdit(),
        }}
      />
    </div>
  );
};

export default EditableTextArea;
