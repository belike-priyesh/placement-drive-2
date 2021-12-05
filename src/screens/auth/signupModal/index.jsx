import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import makeStyles from "@material-ui/styles/makeStyles";
import "./appointment-form.css";
import { loginUser, signUpUser } from "../../../firebase";
import { useAuth } from "../context";
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
  const [loginUi, showLoginUi] = useState(false);
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (isLoggedIn) {
      setModalVisibility(false);
    }
  }, [isLoggedIn]);
  let className = matches ? classes.paper_400 : classes.paper;
  const [modalVisibility, setModalVisibility] = useState(false);
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [disable, setDisable] = useState(false);
  // if (appointmentModalVisibility && !modalVisibility) {
  //   setModalVisibility(true);
  // }
  useImperativeHandle(ref, () => ({
    toggleModal: () => {
      setModalVisibility((prev) => !prev);
    },
  }));
  const _onTextChange = (event) => {
    const { name, value } = event?.nativeEvent?.target || {};
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const _signUp = async () => {
    if (data?.password !== data?.confirmPassword) {
      alert("Password and Confirm password doesn't matched");
      return;
    }
    try {
      setDisable(true);
      await signUpUser(data);
      setModalVisibility(false);
      alert("SignUp successfully");
    } catch (e) {
      if (e?.message) {
        alert("SignUp failed," + e.message);
      } else {
        alert("SignUp failed, Please try again");
      }
      console.warn("WARNING:::", e);
    }
    setDisable(false);
  };

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
              onSubmit={async (event) => {
                event.preventDefault();
                // alert("submit");
                if (loginUi) {
                  try {
                    setDisable(true);
                    await loginUser(data);
                  } catch (e) {
                    if (e?.message) {
                      alert("Login failed," + e.message);
                    } else {
                      alert("Login failed, Please try again");
                    }
                  }
                  setDisable(false);
                } else {
                  _signUp();
                }
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
              {!loginUi && (
                <div style={{ display: "flex" }}>
                  <TextField
                    name="firstName"
                    onChange={_onTextChange}
                    style={{ flex: 1, marginRight: 4 }}
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    required
                  />
                  <TextField
                    name="lastName"
                    onChange={_onTextChange}
                    style={{ flex: 1, marginLeft: 4 }}
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    required
                  />
                </div>
              )}
              <TextField
                name="email"
                onChange={_onTextChange}
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
                required
              />
              <TextField
                name="password"
                onChange={_onTextChange}
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                inputProps={{ minlength: 8 }}
                required
              />
              {!loginUi && (
                <TextField
                  name="confirmPassword"
                  onChange={_onTextChange}
                  id="outlined-basic"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  required
                  inputProps={{ minlength: 8 }}
                />
              )}
              <div className="appointment-form-button-cont">
                <Button
                  disabled={disable}
                  type="submit"
                  variant="outlined"
                  color="primary"
                >
                  {loginUi ? "Login" : "Sign-Up"}
                </Button>
              </div>
            </form>
            <div
              style={{ textAlign: "center" }}
              onClick={() => {
                showLoginUi((prev) => !prev);
              }}
            >
              <h5>
                {loginUi
                  ? "Click here to register"
                  : "Already have an account? Click here to login"}
              </h5>
            </div>
          </Card>
        </Slide>
      </div>
    </Modal>
  );
});
