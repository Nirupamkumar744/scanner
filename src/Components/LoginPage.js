import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Components/firebase";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Loading from "../Widgets/loading";

// Create a theme for Material-UI components
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#f0f0f0",
          borderRadius: "10px",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#f0f0f0",
            boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.3)",
          },
          "&.Mui-focused": {
            backgroundColor: "#f0f0f0",
            boxShadow: "4px 4px 15px rgba(0, 0, 0, 0.4)",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
            borderWidth: "1px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#f39c12",
            borderWidth: "3px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "green",
            borderWidth: "3.5px",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "black",
          fontWeight: "bold",
          fontSize: "0.8rem",
          transition: "all 0.2s ease-in-out",
          top: "0px",
          "&.Mui-focused": {
            color: "green",
            fontSize: "1rem",
            fontWeight: "bold",
            top: "0px"
          },
        },
      },
    },
  },
});

// Styled component for navigation bar
const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  color: #fff;

  @media (max-width: 768px) {
    padding: 15px;
    flex-direction: row;
  }
`;

// Styled component for the logo
const Logo = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Styled component for navbar links container
const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? "flex" : "none")};
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    align-items: center;
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    background-color: rgba(52, 152, 219, 0.9);
    padding: 20px 0;
    border-radius: 10px;
  }
`;

// Styled component for individual navbar link
const NavLink = styled.a`
  text-decoration: none;
  color: #fff;
  font-size: 1.2rem;
  transition: color 0.3s, box-shadow 0.3s;

  &:hover {
    color: #f39c12;
  }

  @media (max-width: 768px) {
    &:hover {
      color: #f39c12;
      box-shadow: 0 0 10px #f39c12, 0 0 20px #f39c12;
    }
  }
`;

// Hamburger icon style
const HamburgerIcon = styled.div`
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  margin-left: auto;

  @media (max-width: 768px) {
    display: flex;
  }

  div {
    width: 30px;
    height: 4px;
    background-color: #fff;
    border-radius: 5px;
    transition: transform 0.3s ease, opacity 0.3s ease;

    &:first-child {
      ${({ open }) => open && "transform: rotate(45deg) translateY(8px);"}
    }
    &:nth-child(2) {
      ${({ open }) => open && "opacity: 0;"}
    }
    &:last-child {
      ${({ open }) => open && "transform: rotate(-45deg) translateY(-8px);"}
    }
  }
`;

// Styled component for login container
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('https://res.cloudinary.com/dcbvuidqn/image/upload/v1737783396/forex-day-trading-3840x2160-13825_b2qe8p.jpg');
  background-size: cover;
  background-position: center;
  color: #fff;
  font-family: Arial, sans-serif;
  animation: fadeIn 1.5s ease-out;
  padding: 20px;
  text-align: center;
  box-sizing: border-box;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    background-image: url('https://res.cloudinary.com/dcbvuidqn/image/upload/v1737783340/8016e4ef6b58bcc31622008a4b6c3c39_w7salz.jpg');
  }
`;

// Styled component for form
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  background: #F5F5F5;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 15px 16px rgba(0, 0, 0, 0.2);
  animation: formFadeIn 1s ease-out;
  box-sizing: border-box;
`;

// Styled component for button
const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #27ae60;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 20px 0;
  box-sizing: border-box;

  &:hover {
    background-color: #2ecc71;
    transform: scale(1.05);
  }
`;

// Styled component for error message
const Error = styled.p`
  color: #e74c3c;
  font-size: 1rem;
  margin-bottom: 15px;
`;

// Styled version of TextField with added styles
const StyledInput = styled(TextField)`
  margin: 15px 0; // Space between input fields
  & .MuiOutlinedInput-root {
    background-color: #ffffff; // White background for input
    border-radius: 10px; // Rounded corners
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); // Subtle shadow
    transition: all 0.3s ease;

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #f39c12; // Change border color on hover
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #27ae60; // Change border color when focused
    }
  }

  & .MuiInputLabel-root {
    color: #555; // Label color
  }

  & .MuiInputLabel-root.Mui-focused {
    color: #27ae60; // Label color when focused
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [showImg, setShowImg] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowImg(false);
    }, 1000);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast("Please enter email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setError("Invalid username or password.");
      toast("Invalid username or password.");
    }
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {
        showImg ? (
          <Loading />
        ) : (
          <>
            <ToastContainer position="top-center" />
            <Navbar>
              <Logo>
                <img
                  src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1737098769/Default_Create_a_round_logo_for_a_stock_market_scanner_or_trad_1_a038e6fd-6af3-4085-9199-449cf7811765_0_vsnsbo.png"
                  alt="TradeApp Logo"
                />
              </Logo>
              <HamburgerIcon open={isOpen} onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
              </HamburgerIcon>
              <NavLinks open={isOpen}>
                <NavLink href="/contact">Contact</NavLink>
              </NavLinks>
            </Navbar>

            <LoginContainer>
              <Form onSubmit={handleLogin}>
                {error && <Error>{error}</Error>}
                <Logo>
                  <img
                    src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1737098769/Default_Create_a_round_logo_for_a_stock_market_scanner_or_trad_1_a038e6fd-6af3-4085-9199-449cf7811765_0_vs nsbo.png"
                    alt="TradeApp Logo"
                  />
                </Logo>

                <h3 style={{ color: "black" }}>Welcome Back!</h3>
                <ThemeProvider theme={theme}>
                  <StyledInput
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="outlined-basic" label="Email" variant="outlined"
                  />
                  <StyledInput
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="outlined-basic" label="Password" variant="outlined"
                  />
                </ThemeProvider>
                <Button type="submit">Login</Button>
              </Form>
            </LoginContainer>
          </>
        )
      }
    </>
  );
};

export default LoginPage;