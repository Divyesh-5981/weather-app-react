const getWeatherInfo = async (city) => {
    try {
        getInfoBtn.disabled = true;

        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const response = await data.json();

        // destructure response and build a new object with that response
        const obj = doDestructuring(response);

        // generateview method generate 2 containers which contains weather information 
        generateView(obj);

    } catch (error) {
        displayErrorMsg("Location is not found! Try Again ☹");
        errorCity = true;
        getInfoBtn.disabled = false;
    }
}