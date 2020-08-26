/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=78470c8481248df786adf9443aa38072&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", Perfomaction);

function Perfomaction() {
  const zipCode = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;
  let funcurl = baseURL + zipCode + apiKey;
  getData(funcurl).then(function (userData) {
    postData("/add", {
      date: newDate,
      temp: userData.main.temp,
      content: content,
    }).then(function (newData) {
      updateUI();
    });
  });
}

//async Get request
const getData = async (funcurl) => {
  const res = await fetch(funcurl);
  try {
    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log("error", error);
  }
};

//async POST request

const postData = async (url = "", data = {}) => {
  const responce = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const NewData = await responce.json();
    return NewData;
  } catch (error) {
    console.log("error", error);
  }
};

//function to update UI
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temp;
    document.getElementById("content").innerHTML = allData.content;
  } catch (error) {
    console.log("error", error);
  }
};
