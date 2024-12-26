import { useContext, useState } from 'react';
// import ThemeContextContext from '../context/theme.context';
import { MEASUREMENT_SYSTEMS } from '../constants';
import '../styles/components/Settings.scss';
import WeatherContext from '../context/weather.context';

function Settings() {
  const [openSettings, setOpenSettings] = useState(false);

  const { measurementSystem, setMeasurementSystem } =
    useContext(WeatherContext);

  const changeMeasurementSystem = (system) => {
    setMeasurementSystem(system);
    setOpenSettings(false);
  };



  return (
    <div className='Settings'>
      <div className='theme-toggler'>
        <div >
          <div >
            <i className='bi bi-sun'></i>
          </div>
          <div>
            <i className='bi bi-moon'></i>
          </div>
        </div>
      </div>
      <div
        className='settings-btn'
        onClick={() => setOpenSettings((prevVal) => !prevVal)}
      >
        <i className={`bi bi-gear${openSettings ? '-fill' : ''}`}></i>
      </div>
      <div className={`settings-menu ${openSettings ? 'open' : ''}`}>
        <div className='measurement-systems'>
          <h4>Measurement Systems:</h4>
          <div className='systems'>
            {Object.values(MEASUREMENT_SYSTEMS).map((system) => (
              <div
                className={`system ${
                  system === measurementSystem ? 'active' : ''
                }`}
                key={system}
                onClick={() => changeMeasurementSystem(system)}
              >
                {system}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
