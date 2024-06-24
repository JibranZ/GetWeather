document.addEventListener("DOMContentLoaded", function () {
  const inputElement = document.querySelector(".input");
  const buttonElement = document.querySelector(".btn");
  const resultElement = document.querySelector(".result");
  async function fetchWeather(inputValue) {
    try {
      // Fetching data
      const response = await fetch(`https://wttr.in/${inputValue}?format=j1`);
      const data = await response.json();
      const location = data.nearest_area[0].areaName[0].value;
      const weatherDesc = data.current_condition[0].weatherDesc[0].value;
      const tempF = data.weather[0].avgtempF;
      const tempC = data.weather[0].avgtempC;
      // resultElement.textContent = `${tempF} °F \n ${location} \n ${weatherDesc}`;
      resultElement.innerHTML = `${tempF} °F<br>${location}<br>${weatherDesc}`;
      // Button to go back to search for location screen
      const backButton = document.createElement("button");
      backButton.textContent = "Back to Input";
      backButton.classList.add("back-btn");
      backButton.classList.add("top-right-button");
      backButton.addEventListener("click", function () {
        resultElement.textContent = "";
        inputElement.style.display = "block";
        buttonElement.style.display = "block";
        document.body.classList.remove("temp-high");
        document.body.classList.remove("temp-low");
      });

      // Button to change the temperature scale from F to C and vise versa
      const changeDegree = document.createElement("button");
      changeDegree.textContent = "Change Temperature Scale";
      changeDegree.classList.add("changeD-btn");
      changeDegree.classList.add("top-right-button");

      let isFahrenheit = true; // Flag to track current temperature scale
      changeDegree.addEventListener("click", function () {
        if (isFahrenheit) {
          resultElement.innerHTML = `${tempC} °C<br>${location}<br>${weatherDesc}`;

          resultElement.appendChild(changeDegree);
          resultElement.appendChild(backButton);
        } else {
          resultElement.innerHTML = `${tempF} °F<br>${location}<br>${weatherDesc}`;

          resultElement.appendChild(changeDegree);
          resultElement.appendChild(backButton);
        }
        isFahrenheit = !isFahrenheit; // Toggle the flag
      });

      // append buttons to element so they appear
      resultElement.appendChild(changeDegree);
      resultElement.appendChild(backButton);

      // hide the text box and submit button
      inputElement.style.display = "none";
      buttonElement.style.display = "none";

      // checks the temperature and displays image accordingly
      if (tempF > 65) {
        document.body.classList.add("temp-high");
      } else if (tempF <= 65) {
        document.body.classList.add("temp-low");
      }
    } catch (err) {
      resultElement.textContent = `Failed to fetch data`;
    }
  }

  // For submit button
  buttonElement.addEventListener("click", function () {
    const inputValue = inputElement.value;
    if (inputValue === "") {
      alert("Please put in a location");
      return "";
    }
    fetchWeather(inputValue);
  });
});
