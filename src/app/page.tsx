"use client"

import axios from "axios"
import Navbar from "@/components/Navbar";
import { useQuery } from "react-query";
import { format, parseISO } from "date-fns";
import Container from "@/components/Container";
import { convertKelvinToCelsius } from "@/utils/Temperature";

//https://api.openweathermap.org/data/2.5/forecast?q=maputo&appid=3167e2b88a17c5f62c87d3abb7c7b8f3&cnt=56

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function Home() {

  const { isLoading, error, data } = useQuery<WeatherData>("repoData", async () => {
    const { data } = await axios.get("https://api.openweathermap.org/data/2.5/forecast?q=maputo&appid=3167e2b88a17c5f62c87d3abb7c7b8f3&cnt=56");
    return data;
  }
  );

  const firstData = data?.list[0]
  console.log(data?.city.name)

  if (isLoading) return (
    <div className="flex items-center min-h-screen justify-center">
      <p className="animate-bounce">Loading...</p>
    </div>
  )

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* Today Data */}
        <section className="space-y-4">
          <div>
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
              <p className="text-lg">({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yy")})</p>
            </h2>
            <Container className="gap-10 px-6 items-center">
              {/*temperature */}
              <div className="flex flex-col px-4">
                <span className="text-5xl">
                  {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span> {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°</span>
                </p>
                <p className="text-xs space-x-2">
                  <span>{convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓{""}</span>
                  <span>{convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°⭡{""}</span>
                </p>
              </div>
              {/*time and weather icon */}
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">

              </div>
            </Container>
          </div>
        </section>
        {/* Forecast Data */}
        <section>

        </section>
      </main>
    </div>
  );
}