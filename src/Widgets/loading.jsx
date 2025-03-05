import React from 'react';

function Loading() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                width="200"
                height="200"
                style={{ shapeRendering: 'auto', background: 'rgb(255, 255, 255)' }}
            >
                {[...Array(12)].map((_, i) => (
                    <g key={i} transform={`rotate(${i * 30} 50 50)`}>
                        <rect
                            fill={["#fe718d", "#ff3400", "#00ffbc", "#0011ff", "#c8ff00", "#6492ac", "#637cb5", "#6a63b6", "#fe718d", "#ff3400", "#00ffbc", "#0011ff"][i]}
                            height="12"
                            width="6"
                            ry="6"
                            rx="3"
                            y="24"
                            x="47"
                        >
                            <animate
                                repeatCount="indefinite"
                                begin={`-${(11 - i) / 12}s`}
                                dur="1s"
                                keyTimes="0;1"
                                values="1;0"
                                attributeName="opacity"
                            />
                        </rect>
                    </g>
                ))}
            </svg>
        </div>
    );
}

export default Loading;