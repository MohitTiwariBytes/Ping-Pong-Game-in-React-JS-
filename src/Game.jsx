import React, { useState } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

const Game = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);

  const sketch = (p) => {
    let playerY;
    let botY;
    let ballX;
    let ballY;
    let ballSpeedX;
    let ballSpeedY;
    const paddleWidth = 10;
    const paddleHeight = 100;
    const ballSize = 20;
    const gameWidth = 800;
    const gameHeight = 600;

    p.setup = () => {
      p.createCanvas(gameWidth, gameHeight);
      playerY = p.height / 2 - paddleHeight / 2;
      botY = p.height / 2 - paddleHeight / 2;
      ballX = p.width / 2;
      ballY = p.height / 2;
      ballSpeedX = p.random(2, 3) * (p.random() > 0.5 ? 1 : -1);
      ballSpeedY = p.random(2, 3) * (p.random() > 0.5 ? 1 : -1);
    };

    p.draw = () => {
      p.background(0);

      // Display scores
      p.fill(255);
      p.textSize(32);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(playerScore, p.width / 4, 50);
      p.text(botScore, (p.width / 4) * 3, 50);

      // Player paddle
      p.rect(0, playerY, paddleWidth, paddleHeight);

      // Bot paddle
      p.rect(p.width - paddleWidth, botY, paddleWidth, paddleHeight);

      // Ball
      p.ellipse(ballX, ballY, ballSize, ballSize);

      // Ball movement
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Ball collision with top and bottom
      if (ballY <= 0 || ballY >= p.height - ballSize) {
        ballSpeedY *= -1;
      }

      // Ball collision with player paddle
      if (
        ballX - ballSize / 2 <= paddleWidth &&
        ballY >= playerY &&
        ballY <= playerY + paddleHeight
      ) {
        ballSpeedX *= -1;
        ballSpeedY = p.random(2, 3) * (p.random() > 0.5 ? 1 : -1);
      }

      // Ball collision with bot paddle
      if (
        ballX + ballSize / 2 >= p.width - paddleWidth &&
        ballY >= botY &&
        ballY <= botY + paddleHeight
      ) {
        ballSpeedX *= -1;
        ballSpeedY = p.random(2, 3) * (p.random() > 0.5 ? 1 : -1);
      }

      // Reset ball if it goes out of bounds and update scores
      if (ballX <= 0) {
        setBotScore((prev) => prev + 1);
        resetBall();
      } else if (ballX >= p.width) {
        setPlayerScore((prev) => prev + 1);
        resetBall();
      }

      // Simple bot AI
      botY = p.constrain(ballY - paddleHeight / 2, 0, p.height - paddleHeight);

      // Player paddle control
      playerY = p.constrain(p.mouseY - paddleHeight / 2, 0, p.height - paddleHeight);
    };

    const resetBall = () => {
      ballX = p.width / 2;
      ballY = p.height / 2;
      ballSpeedX = p.random(2, 3) * (p.random() > 0.5 ? 1 : -1);
      ballSpeedY = p.random(2, 3) * (p.random() > 0.5 ? 1 : -1);
    };
  };

  return <ReactP5Wrapper sketch={sketch} />;
};

export default Game;
