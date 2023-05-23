using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using WebAPI.Data;
using WebAPI.Data.Repo;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase {

        private readonly ICityRepository repo;
        public CityController(ICityRepository _repo) { 
            this.repo = _repo;  
        } 

        [HttpGet]
        public async Task<IActionResult> GetCities() {
            var cities = await repo.GetCitiesAsync();
            //var cities = await dataContext.Cities!.ToListAsync();
            return Ok(cities); 
        }

        // Post api/city/add?cityName=BKK
        // Post api/city/add/BKK
        //[HttpPost("add")]
        //[HttpPost("add/{cityName}")]
        //public async Task<IActionResult> AddCity(string cityName) {
        //    var city = new City {
        //        Name = cityName
        //    };

        //    await dataContext.Cities!.AddAsync(city);
        //    await dataContext.SaveChangesAsync();
        //    return Ok(city);
        //}

        // Post api/city/post -- Post data in JSON format
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(City city) {
            repo.AddCity(city);
            await repo.SaveAsync();
            return StatusCode(201);
        }

        // Delete api/city/1 
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id) {
            repo.DeleteCity(id);
            await repo.SaveAsync();
            //var city = await dataContext.Cities!.FindAsync(id);
            //dataContext.Cities.Remove(city!);
            //await dataContext.SaveChangesAsync();
            return Ok(id);
        }


        [HttpGet("{id}")]
        public string Get(int id) {
            return "Atlanta";
        }
    }
}
