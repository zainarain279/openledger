const fs = require("fs");
const colors = require("colors");

function sleep(seconds = null) {
  if (seconds && typeof seconds === "number") return new Promise((resolve) => setTimeout(resolve, seconds * 1000));

  let min = 1,
    max = 1;
  if (seconds && Array.isArray(seconds)) {
    min = seconds[0];
    max = seconds[1];
  }

  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(resolve, delay * 1000);
  });
}

function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function isTokenExpired(token) {
  if (!token) return true;

  try {
    const [, payload] = token.split(".");
    if (!payload) return true;

    const decodedPayload = JSON.parse(Buffer.from(payload, "base64").toString());
    const now = Math.floor(Date.now() / 1000);

    if (!decodedPayload.exp) {
      // console.log("Eternal token".yellow);
      return false;
    }

    const expirationDate = new Date(decodedPayload.exp * 1000);
    const isExpired = now > decodedPayload.exp;

    console.log(`Token expires after: ${expirationDate.toLocaleString()}`.magenta);
    console.log(`Token status: ${isExpired ? "Expired".yellow : "Valid".green}`);

    return isExpired;
  } catch (error) {
    console.log(`Error checking token: ${error.message}`.red);
    return true;
  }
}

module.exports = {
  getRandomNumber,
  getRandomElement,
  sleep,
  isTokenExpired,
};
