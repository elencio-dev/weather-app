import React from "react"
import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { MdAir } from "react-icons/md";

export interface WeatherDetailProps {
  visability: string,
  humidity: string,
  windSpeed: string,
  airPressure: string,
  sunrise: string,
  sunset: string
}

type Props = {}

export default function WeatherDetails(props: WeatherDetailProps) {

  const {
    visability = "25km",
    humidity = "61%",
    windSpeed = "7 km/h",
    airPressure = "1012 hPa",
    sunrise = "6.20",
    sunset = "18:48"
  } = props

  return (
    <>
      <SingleWeatherDetails
        value={props.visability}
        information="Visability"
        icon={<LuEye />} />

      <SingleWeatherDetails
        value={props.humidity}
        information="Humidity"
        icon={<FiDroplet />} />

      <SingleWeatherDetails
        value={props.windSpeed}
        information="WindSpeed"
        icon={<MdAir />} />

      <SingleWeatherDetails
        value={props.sunrise}
        information="Sunrise"
        icon={<LuSunrise />} />

      <SingleWeatherDetails
        value={props.sunset}
        information="Sunset"
        icon={<LuSunset />} />

      <SingleWeatherDetails
        value={props.airPressure}
        information="AirPressure"
        icon={<ImMeter />} />

    </>
  )
}

interface SingleWeatherDetailsProps {
  information: string,
  icon: React.ReactNode;
  value: string;
}

function SingleWeatherDetails(props: SingleWeatherDetailsProps) {
  return (
    <div className="flex flex-col justify-between gap-2 itemms-center text-xs font-semibold tex-black/80">
      <p className="whitespace-nowrap">{props.information}</p>
      <div className="text-3xl">{props.icon}</div>
      <p>{props.value}</p>
    </div>
  )
}