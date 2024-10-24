const api_key = "502e6bed981e410ba8d172230242110";

const base_url = "http://api.weatherapi.com/v1/current.json?";

const weather_images = [
  {
    type: "Partly cloudy",
    img: "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=5000&h=3500&dpr=1",
  },
  {
    type: "Clear",
    img: "https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg?auto=compress&cs=tinysrgb&w=5000&h=3500&dpr=1",
  },
  {
    type: "Clear",
    img: "https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=5000&h=3500&dpr=1",
  },
  {
    type: "Clear",
    img: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=5000&h=3500&dpr=1",
  },
  {
    type: "Sunny",
    img: "https://images.pexels.com/photos/259620/pexels-photo-259620.jpeg?auto=compress&cs=tinysrgb&w=5000&h=3500&dpr=1",
  },
  {
    type: "Patchy light rain with thunder",
    img: "https://images.pexels.com/photos/66867/norman-oklahoma-lightning-dangerous-66867.jpeg?auto=compress&cs=tinysrgb&w=5000&h=3500&dpr=1",
  },
  {
    type: "Sunny",
    img: "https://images.pexels.com/photos/681391/pexels-photo-681391.jpeg?auto=compress&cs=tinysrgb&w=5000&h=3500&dpr=1",
  },
  {
    type: "Patchy light rain with thunder",
    img: "https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=5000&h=3500&dpr=1",
  },
  {
    type: "Light rain",
    img: "https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg?auto=compress&cs=tinysrgb&w=5000&h=3500&dpr=1",
  },
];

function formatDateTime(dateTimeString) {
  const dateObj = new Date(dateTimeString);
  const time = dateObj.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dayName = dateObj.toLocaleString("en-US", { weekday: "long" });

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-US", { month: "short" }); // Oct
  const year = dateObj.getFullYear().toString().slice(-2); // Last two digits of the year

  const formattedDate = `${time}-${dayName}, ${day} ${month} ${year}`;

  return formattedDate;
}

function calculateRainProbability(cloud, humidity, precip_mm) {
  let rainProbability = 0;
  rainProbability += cloud * 0.5;
  if (humidity > 80) {
    rainProbability += (humidity - 80) * 1.5;
  }
  if (precip_mm > 0) {
    rainProbability += precip_mm * 10;
  }
  return Math.min(rainProbability, 100);
}

const getData = async (city) => {
  const city_name = city;
  const complete_url = `${base_url}key=${api_key}&q=${city_name}`;
  const data = await fetch(complete_url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.cod !== "404") {
        return data;
      } else {
        console.log("City Not Found");
      }
    })
    .catch((error) => {
      console.log("Error fetching data: ", error);
      return alert("Error fetching data: ", error);
    });
  return data;
};

const updateData = (
  areaUpdated,
  timeUpdated,
  tempUpdated,
  cloudStatusData,
  cloudPercentData,
  humidityPercentData,
  wind_kphData,
  rainPercentData,
  weather_type_image
) => {
  const area = document.querySelector(".area h3");
  const time = document.querySelector(".area time");
  const temp = document.querySelector(".widget-temp h1");
  const cloudStatus = document.querySelector("#cloud_status");
  const cloudPercent = document.querySelector("#cloud_percent");
  const humidityPercent = document.querySelector("#humidity_percent");
  const wind_kph = document.querySelector("#wind_kph");
  const rainPercent = document.querySelector("#rain_percent");
  const weather_image_container = document.querySelector(".container");

  area.innerHTML = areaUpdated;
  time.innerHTML = timeUpdated;
  temp.innerHTML = tempUpdated;
  cloudStatus.innerHTML = cloudStatusData;
  cloudPercent.innerHTML = cloudPercentData;
  humidityPercent.innerHTML = humidityPercentData;
  wind_kph.innerHTML = wind_kphData;
  rainPercent.innerHTML = rainPercentData;
  weather_image_container.style.backgroundImage = `url(${weather_type_image})`;
  console.log(rainPercentData);
};

const getAndUpdate = (name) => {
  getData(name).then((data) => {
    console.log(data);
    const cloudStatusData = data.current.condition.text;
    const cloudPercentData = data.current.cloud;
    const humidityPercentData = data.current.humidity;
    const wind_kphData = data.current.wind_kph;
    const rainPercentData = calculateRainProbability(
      cloudPercentData,
      humidityPercentData,
      data.current.precip_mm
    );
    const weatherLogo = data.current.condition.icon;
    const weatherImages = weather_images.filter(
      (imageObj) => imageObj.type === data.current.condition.text
    );
    const randomNum = Math.floor(Math.random() * weatherImages.length);
    const weatherImage =
      (weatherImages.length > 0 && weatherImages[randomNum].img) ||
      "https://images.pexels.com/photos/259620/pexels-photo-259620.jpeg?auto=compress&cs=tinysrgb&w=5000&h=3500&dpr=1";
    console.log(weatherImages);

    updateData(
      `${data.location.name} ${data.location.country} <img src="${weatherLogo}" alt="">`,
      formatDateTime(data.location.localtime),
      `${data.current.temp_c} <span><i class="fa-regular fa-circle"></i></span>`,
      `${cloudStatusData}`,
      ` (${cloudPercentData}% Cloud)`,
      `${humidityPercentData}%`,
      `${wind_kphData} kph`,
      `${rainPercentData}%`,
      weatherImage
    );
  });
};

const list = document.querySelectorAll(".list ul li");

list.forEach((item) =>
  item.addEventListener("click", () => {
    getAndUpdate(item.id);
  })
);

document.querySelector(".locations button").addEventListener("click", (e) => {
  const name = document
    .querySelector(".locations input")
    .value.trim()
    .toLowerCase();
  getAndUpdate(name);
});
