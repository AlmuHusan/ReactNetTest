using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace sql_react_test.Core
{
    public class WeatherForecastDbContext: DbContext
    {
        public WeatherForecastDbContext(DbContextOptions<WeatherForecastDbContext> options) : base(options)
        {

        }
        public DbSet<WeatherForecast> WeatherForecast { get; set; }



    }
}
