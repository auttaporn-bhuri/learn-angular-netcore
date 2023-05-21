using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase {

        private readonly DataContext dataContext;
        public CityController(DataContext _dataContext) { 
            this.dataContext = _dataContext; 
        } 

        [HttpGet]
        public async Task<IActionResult> GetCities() {
            var cities = await dataContext.Cities.ToListAsync();
            return Ok(cities); 
        }

        // Post api/city/add?cityName=BKK
        // Post api/city/add/BKK
        [HttpPost("add")]
        [HttpPost("add/{cityName}")]
        public async Task<IActionResult> AddCity(string cityName) {
            var city = new City {
                Name = cityName
            };

            await dataContext.Cities.AddAsync(city);
            await dataContext.SaveChangesAsync();
            return Ok(city);
        }

        // Post api/city/post -- Post data in JSON format
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(City city) {
            await dataContext.Cities.AddAsync(city);
            await dataContext.SaveChangesAsync();
            return Ok(city);
        }

        // Delete api/city/1 
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id) {
            var city = await dataContext.Cities.FindAsync(id);
            dataContext.Cities.Remove(city!);
            await dataContext.SaveChangesAsync();
            return Ok(id);
        }


        [HttpGet("{id}")]
        public string Get(int id) {
            return "Atlanta";
        }
    }
}
