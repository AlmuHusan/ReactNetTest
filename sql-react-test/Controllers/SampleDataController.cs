using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using sql_react_test.Core;
using System.Text.Json.Serialization;
using System.Net;

namespace sql_react_test.Controllers
{

    [Route("api/[controller]")]
    public partial class SampleDataController : Controller
    {

        SQLWeatherForecastData data;
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        public SampleDataController(SQLWeatherForecastData data)
        {
            this.data = data;
        }
        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }
        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> SQLWeatherForecasts()
        {

            Console.WriteLine(data);
            return data.getList();

        }
        [HttpPut("[action]/{id}")]
        public WeatherForecast SQLWeatherForecastsDelete(int id)
        {
            return data.DeleteId(id);


        }
        [HttpPut("[action]")]
        public void SQLWeatherForecastsAdd([FromBody] WeatherForecast weatherJSON)
        {
            WeatherForecast weatherData = new WeatherForecast();
            try
            {
                if (weatherJSON.Summary.Length <= 30)
                {
                    weatherData.DateFormatted = weatherJSON.DateFormatted;
                    weatherData.TemperatureC = weatherJSON.TemperatureC;
                    weatherData.Summary = weatherJSON.Summary;
                    data.AddWeather(weatherData);
                }
            }
            catch
            {

            }
            
             
        }


    }
}
