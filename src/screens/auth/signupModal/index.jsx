import React, { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import makeStyles from "@material-ui/styles/makeStyles";
import "./appointment-form.css";
// import { useAppointment } from "..";

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      height: "auto",
      width: "50%",
    },
    paper_400: {
      height: "auto",
      width: "90%",
    },
    root: {
      marginRight: "10px",
    },
    btn: {
      maxWidth: "30px",
    },
  };
});
export default forwardRef((props, ref) => {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:450px)");
  let className = matches ? classes.paper_400 : classes.paper;
  const [modalVisibility, setModalVisibility] = useState(false);
  // if (appointmentModalVisibility && !modalVisibility) {
  //   setModalVisibility(true);
  // }
  useImperativeHandle(ref, () => ({
    toggleModal: () => {
      setModalVisibility((prev) => !prev);
    },
  }));
  return (
    <Modal
      open={modalVisibility}
      onClose={() => {
        setModalVisibility((current) => !current);
      }}
    >
      <div className="appointment-form-cont">
        <Slide in={modalVisibility} onExited={() => setModalVisibility(false)}>
          <Card className={className}>
            <form
              className="appointment-form"
              noValidate={false}
              onSubmit={(event) => {
                event.preventDefault();
                alert("submit");
              }}
              autoComplete="on"
            >
              <span style={{ display: "flex", flexDirection: "row-reverse" }}>
                <Button
                  className={classes.btn}
                  variant="text"
                  color="secondary"
                  onClick={() => setModalVisibility((prev) => !prev)}
                >
                  X
                </Button>
              </span>
              <div style={{ display: "flex" }}>
                <TextField
                  style={{ flex: 1, marginRight: 4 }}
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  required
                />
                <TextField
                  style={{ flex: 1, marginLeft: 4 }}
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  required
                />
              </div>
              <TextField
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
                required
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                required
              />
              <TextField
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                required
              />
              <div className="appointment-form-button-cont">
                <Button type="submit" variant="outlined" color="primary">
                  Sign-Up
                </Button>
              </div>
            </form>
          </Card>
        </Slide>
      </div>
    </Modal>
  );
});
