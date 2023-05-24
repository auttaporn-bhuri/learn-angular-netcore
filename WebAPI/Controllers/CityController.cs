using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using WebAPI.Data;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase {

        private readonly IUnitOfWork uow;
        public CityController(IUnitOfWork _uow) { 
            this.uow = _uow;  
        } 

        [HttpGet]
        public async Task<IActionResult> GetCities() {
            var cities = await uow.cityRepository.GetCitiesAsync();

            var citiesDto = from c in cities
                            select new CityDto() {
                                Id = c.Id,
                                Name = c.Name
                            };

            //var cities = await dataContext.Cities!.ToListAsync();
            return Ok(citiesDto); 
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
        public async Task<IActionResult> AddCity(CityDto cityDto) {
            var city = new City {
                Name = cityDto.Name,
                LastUpdatedBy = 1,
                LastUpdatedOn = DateTime.Now
            };

            uow.cityRepository.AddCity(city);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        // Delete api/city/1 
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id) {
            uow.cityRepository.DeleteCity(id);
            await uow.SaveAsync();
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
