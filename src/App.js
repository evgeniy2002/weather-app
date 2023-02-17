import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import marker from './assets/images/marker.svg';
import search from './assets/images/search.svg';
import snow from './assets/images/snow.gif';
import humidity from './assets/images/humidity.svg';
import wind from './assets/images/wind.svg';
import rain from './assets/images/rain.gif';
import cloudy from './assets/images/cloudy.gif';
import clouds from './assets/images/clouds.gif';
import sad from './assets/images/sad.gif';

import 'swiper/css';
import LoadingBlock from './Loader/Loader';
import MiniLoader from './Loader/MiniLoader';

const chooseWeatherImg = (img) => {
  switch (img) {
    case 'clouds':
      return clouds;
    case 'snow':
      return snow;
    case 'rain':
      return rain;
    case 'clear':
      return cloudy;

    default:
      break;
  }
};

function App() {
  const [inputState, setInputState] = React.useState('');
  const [clickButton, setClickButton] = React.useState(false);
  const [popup, setPopup] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [currImg, setCurcImg] = React.useState([]);
  const [errorState, setErrorState] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (clickButton) {
      setPopup(true);
      setIsLoaded(true);
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${inputState}&appid=e221cfa3e7de72c652f41fecca0e768d`,
      )
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            setErrorState(false);

            return res;
          } else {
            setErrorState(true);
            return;
          }
        })

        .then((res) => res.json())
        .then((data) => {
          setItems(data.list);
          setCurcImg(data.list[0].weather[0].main.toLowerCase());
          setIsLoaded(false);
        });
    }

    setClickButton(false);
  }, [clickButton]);

  const handleButton = () => {
    setClickButton(true);
  };

  return (
    <main className="h-screen flex items-center justify-center bg-slate-800">
      <div className={`w-1/3 border  p-10 bg-white rounded-3xl ${!popup && 'flex'}`}>
        <header className={`flex items-center justify-between ${!popup && 'w-full'}`}>
          <img src={marker} alt="" className="w-8 h-8 " />
          <input
            type="text"
            value={inputState}
            onChange={(e) => setInputState(e.target.value)}
            placeholder="Введите название города"
            className="block w-2/3 h-12 text-2xl p-3 outline-none font-sans border-b-2 text-slate-900 placeholder:text-slate-900"
          />
          <button
            onClick={handleButton}
            className="bg-teal-500 p-4 rounded-full outline-none transition hover:bg-teal-600 hover:transition">
            <img src={search} alt="" />
          </button>
        </header>
        {popup && !errorState && (
          <div>
            <p className="text-4xl font-medium pt-10 pb-7">Прогноз на сегодня</p>
          </div>
        )}

        {errorState ? (
          <div className="text-center mt-12">
            <img src={sad} alt="" className="w-40 h-40 block  mx-auto" />
            <p className="text-2xl font-sans">Упс, но я ничего не нашел</p>
          </div>
        ) : (
          <div>
            {isLoaded ? (
              <LoadingBlock />
            ) : (
              <div
                className={` p-3  border-slate-200 rounded-3xl flex shadow-xl shadow-slate-300  ${
                  popup ? 'opacity-100 visible  ' : 'opacity-0 hidden '
                }`}>
                {<img src={chooseWeatherImg(currImg)} alt="" className="w-44 h-44" />}

                <div className="w-full flex p-3 justify-center">
                  <div className="flex flex-col ml-3">
                    <h2 className="text-3xl text-black font-medium">Now</h2>
                    <h1 className="text-black text-5xl font-bold mt-2 mb-auto">
                      {Math.floor(items[0] && items[0].main.temp - 273.15)}°C
                    </h1>
                    <p className="text-black text-2xl mb-auto font-normal">
                      {items[0] && items[0].weather[0].description}
                    </p>
                    <span className="text-3xl">{items[0] && items[0].dt_txt.slice(10)}</span>
                  </div>
                  <div className="ml-12">
                    <div className="text-center mb-5">
                      <img src={humidity} alt="" className="w-10 h-10 mx-auto" />
                      <div className="pl-3">
                        <span className="font-bold text-2xl">
                          {items[0] && items[0].main.humidity}%
                        </span>
                        <p className="font-normal text-lg">Humidity</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <img src={wind} alt="" className="w-10 h-10 mx-auto" />
                      <div className="pl-3">
                        <span className="font-bold text-2xl">
                          {items[0] && items[0].wind.speed}Km/h
                        </span>
                        <p className="font-normal text-lg">Wind Speed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Swiper slidesPerView={3} className="mt-12 ">
              <div className="flex justify-between">
                {isLoaded ? (
                  new Array(3).fill(0).map((_, index) => <MiniLoader key={index} />)
                ) : (
                  <>
                    {items.slice(1, items.length - 1).map((el, idx) => (
                      <SwiperSlide key={idx} className="border-r-2">
                        <div className=" p-5 text-center rounded-3xl ">
                          <h2 className="text-xl">{el.dt_txt}</h2>
                          <img
                            src={chooseWeatherImg(currImg)}
                            alt=""
                            className="w-20 h-20 mx-auto mb-3 mt-2"
                          />
                          <span className="font-bold text-2xl">
                            {Math.floor(el.main.temp - 273.15)}°C
                          </span>
                        </div>
                      </SwiperSlide>
                    ))}
                  </>
                )}
              </div>
            </Swiper>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
