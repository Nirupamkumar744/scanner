import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Components/firebase";
import styled from "styled-components";

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

// Styled component for the logo, making it round
const Logo = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;  /* Ensures the image is cropped to fit the round shape */
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;  /* Ensures the image fits inside the round container */
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
    background-color: rgba(52, 152, 219, 0.9); /* Background color for mobile menu */
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
    box-shadow: 0 0 10px #f39c12, 0 0 20px #f39c12; /* Glowing effect */
  }

  @media (max-width: 768px) {
    transition: color 0.3s, box-shadow 0.3s;
    &:hover {
      color: #f39c12;
      box-shadow: 0 0 10px #f39c12, 0 0 20px #f39c12; /* Glowing effect */
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
  background: #2c3e50;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  animation: formFadeIn 1s ease-out;
  box-sizing: border-box;

  @keyframes formFadeIn {
    0% {
      transform: translateY(-30px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;



// Styled component for input fields
const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;

  &:focus {
    border: 2px solid #f39c12;
    box-shadow: 0 0 12px #f39c12;
  }
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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic input validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
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
          <NavLink href="/blogs">Blogs</NavLink>
          <NavLink href="/tutorial">Tutorial</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </NavLinks>
      </Navbar>

      <LoginContainer>
        
        <Form onSubmit={handleLogin}>
          {error && <Error>{error}</Error>}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </Form>
      </LoginContainer>
    </>
  );
};

export default LoginPage;
