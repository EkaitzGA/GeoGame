import React, { useState } from 'react';
import './gameInfo.css';

const GameInfo = () => {
    const [isVisible, setIsVisible] = useState(false);

    const modesInfo = [
        {
            title: "Blitz Mode",
            description: "In Blitz mode, you'll have only 5s to answer each question. If you don't answer, I'll do it for you, usually with a wrong answer. Perfect for a challenge."
        },
        {
            title: "Relax Mode",
            description: "In Relax mode, there's no time pressure, you can think carefully about each answer without stress. Perfect for learning and improving your geography knowledge."
        }
    ];

    return (
        <div className="info-container">
            <button
                onClick={() => setIsVisible(!isVisible)}
                className="info-button"
            >
                INFO
            </button>

            {isVisible && (
                <>
                    <div
                        className="info-overlay"
                        onClick={() => setIsVisible(false)}
                    />
                    <div className="info-modal">
                        <button
                            onClick={() => setIsVisible(false)}
                            className="close-icon"
                        >
                            ×
                        </button>
                        {modesInfo.map((mode, index) => (
                            <div key={mode.title} className={`mode-info ${index > 0 ? 'mt-4' : ''}`}>
                                <h3 className="info-title">{mode.title}</h3>
                                <p className="info-description">{mode.description}</p>
                            </div>
                        ))}

                    </div>
                </>
            )}
        </div>
    );
};

export default GameInfo;