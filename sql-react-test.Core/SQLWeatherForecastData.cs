using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace sql_react_test.Core
{
    public class SQLWeatherForecastData
    {
        private readonly WeatherForecastDbContext db;
        public SQLWeatherForecastData(WeatherForecastDbContext db)
        {
            this.db = db;
        }
        public IQueryable<WeatherForecast> getList()
        {
            return db.Set<WeatherForecast>();
        }
        public WeatherForecast DeleteId(int id)
        {
            WeatherForecast weather = GetById(id);
            if (weather != null)
            {
                db.WeatherForecast.Remove(weather);
                db.SaveChanges();
                return weather;
            }
            return null;
        }

        private WeatherForecast GetById(int id)
        {
            return db.WeatherForecast.Find(id);
        }
    }
}
