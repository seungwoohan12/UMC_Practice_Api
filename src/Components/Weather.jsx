import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function Weather() {
  const [city, setcity] = useState("");
  const [data, setdata] = useState(null);
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2ae1438192214b4e36bde3cd60f361a1`;

  async function searchWeather() {
    try {
      const api = await axios.get(url);
      setdata(api.data);
      console.log(api.data);
    } catch (err) {
      console.error(`error: ${err}`);
      setdata(null);
    }
  }

  const onChange = (e) => {
    setcity(e.target.value);
  };

  const search = async (e) => {
    console.log(city);
    if (e.key === "Enter") {
      await searchWeather();
    }
  };

  return (
    <Form>
      <Inputform
        onChange={onChange}
        onKeyDown={search}
        placeholder="도시를 입력하세요"
      />
      {data && (
        <Weatherform>
          <City>{data.name}</City>
          <Temp>{Math.round((data.main.temp - 273.15) * 10) / 10}℃</Temp>
          <Weatherinfo>{data.weather[0].description}</Weatherinfo>
        </Weatherform>
      )}
    </Form>
  );
}

const Form = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120vh;
  display: flex;
  
`;
const Inputform = styled.input`
  padding-left: 20px;
  font-size: 15px;
  width: 150px;
  height: 40px;
  border-radius: 10px;
`;
const Weatherform = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 40px;
  width: 130px;
  border: solid 1px;
  border-radius: 10px;
`;

const Temp = styled.div`
  margin-top: 10px;
  font-size: 60px;
`;

const Weatherinfo = styled.div`
  margin-top: 10px;
  font-size: 20px;
  margin-left: auto;
`;

const City = styled.div`
  font-size: 25px;
`;