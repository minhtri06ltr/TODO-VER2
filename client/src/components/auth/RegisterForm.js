import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const RegisterForm = () => {
  // Context
  const { registerUser } =
    useContext(AuthContext);

  // Local state
  const [registerForm, setRegisterForm] =
    useState({
      usernameTyping: "",
      passwordTyping: "",
      confirmPasswordTyping: "",
    });

  const [alert, setAlert] = useState(null);

  const {
    usernameTyping,
    passwordTyping,
    confirmPasswordTyping,
  } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();

    if (
      passwordTyping !== confirmPasswordTyping
    ) {
      setAlert({
        type: "danger",
        message: "Passwords do not match",
      });
      setTimeout(() => setAlert(null), 5000);
      return;
    }

    try {
      const registerData = await registerUser(
        registerForm,
      );
      if (!registerData.success) {
        setAlert({
          type: "danger",
          message: registerData.message,
        });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alert} />

        <Form.Group>
          <Form.Control
            type="text"
            placeholder="User name"
            name="usernameTyping"
            required
            value={usernameTyping}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="passwordTyping"
            required
            value={passwordTyping}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPasswordTyping"
            required
            value={confirmPasswordTyping}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to="/login">
          <Button
            variant="info"
            size="sm"
            className="ml-2"
          >
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
