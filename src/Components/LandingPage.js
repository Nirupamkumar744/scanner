import React, { useEffect } from 'react';
import { FaArrowRight } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { Link } from 'react-router-dom';

const LandingPage = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/plyr/3.7.8/plyr.polyfilled.min.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div>
            <style>{`
                body {
                    font-family: 'Poppins', sans-serif;
                    margin: 0;
                    padding: 0;
                    background: linear-gradient(to bottom, #caefd7, #f5bfd7, #abc9e9);
                    overflow-x: hidden;
                }
                .flex {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .navbar {
                    box-sizing: border-box;
                    background: linear-gradient(to right, #caefd7, #f5bfd7, #abc9e9);
                    border-bottom: 1px solid #ddd;
                    position: fixed;
                    width: 100%;
                    max-width: 100%;
                    top: 0;
                    left: 0;
                    z-index: 1000;
                    padding: 15px 32px;
                    box-shadow: 10px 5px 8px #888888;
                }
                .navbar img {
                    height: 55px;
                    width: 55px;
                }
                .login-btn {
                    background: #000000;
                    color: white;
                    border-radius: 5px;
                    width: 70px;
                    padding: 10px 20px;
                    transition: all 0.3s ease-in-out;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                }
                .login-btn:hover {
                    transform: scale(1.1);
                    background: #222222;
                    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
                }
                .login-btn:active {
                    transform: scale(0.95);
                    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
                }
                .login-btn a {
                    font-weight: bold;
                    border: none;
                    font-size: 14.5px;
                    cursor: pointer;
                }
                .contact-btn {
                    margin-top: 10px;
                    padding: 12px 12px;
                    background: #000000;
                    color: white;
                    border-radius: 5px;
                    width: 105px;
                    transition: all 0.3s ease-in-out;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                }
                .contact-btn:hover {
                    transform: scale(1.1);
                    background: #222222;
                    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
                }
                .contact-btn:active {
                    transform: scale(0.95);
                    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
                }
                .contact-btn a {
                    color: white;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 14.5px;
                }
                .section {
                    margin-top: 50px;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    padding: 80px 32px;
                }
                .section.reverse {
                    flex-direction: row-reverse;
                }
                .text, .video {
                    flex: 1;
                    padding: 20px;
                }
                iframe {
                    width: 100%;
                    height: 400px;
                    border-radius: 10px;
                    box-shadow: 10px 10px 8px #888888;
                }
                footer {
                    background: #333;
                    color: white;
                    text-align: center;
                    padding: 20px;
                }
            `}</style>

            <nav style={{ fontFamily: 'MyCustomFont' }} className="navbar flex">
                <div className='flex'>
                    <img src="https://res.cloudinary.com/dcbvuidqn/image/upload/v1737098769/Default_Create_a_round_logo_for_a_stock_market_scanner_or_trad_1_a038e6fd-6af3-4085-9199-449cf7811765_0_vsnsbo.png" alt="Logo" />
                    <span style={{ marginLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}>Trading Courses</span>
                </div>
                <Link to={"/login"}>
                    <div className='login-btn flex'>
                        <a>Login</a>
                        <LuLogIn strokeWidth={3} />
                    </div>
                </Link>
            </nav>

            {[
                {
                    title: "Master Forex Trading Fundamentals",
                    description: "Start your journey into forex trading with our comprehensive beginner's course.",
                    videoUrl: "https://www.youtube.com/embed/rlZRtQkfK04",
                    reverse: false
                },
                {
                    title: "Master Forex Trading Fundamentals",
                    description: "Start your journey into forex trading with our comprehensive beginner's course.",
                    videoUrl: "https://www.youtube.com/embed/rlZRtQkfK04",
                    reverse: true
                },
                {
                    title: "Advanced Trading Strategies",
                    description: "Take your trading to the next level with our advanced course.",
                    videoUrl: "https://www.youtube.com/embed/3qeTU43qXUM",
                    reverse: false
                },
                {
                    title: "Market Analysis Mastery",
                    description: "Master the art of market analysis with our expert-led course.",
                    videoUrl: "https://www.youtube.com/embed/_I2wpp0pnEo",
                    reverse: true
                }
            ].map((section, index) => (
                <section style={{ fontFamily: 'MyCustomFont' }} key={index} className={`section ${section.reverse ? 'reverse' : ''}`}>
                    <div className="text">
                        <h2>{section.title}</h2>
                        <p>{section.description}</p>
                        <div className='contact-btn flex'>
                            <a href="#" className="button">Contact Us</a>
                            <FaArrowRight />
                        </div>
                    </div>
                    <div className="video">
                        <iframe frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" src={section.videoUrl} title={section.title} allowFullScreen></iframe>
                    </div>
                </section>
            ))}

            <footer>
                <p>&copy; 2024 Trading Courses. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;