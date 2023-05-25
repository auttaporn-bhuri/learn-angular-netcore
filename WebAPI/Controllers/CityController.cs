using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
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
        private readonly IMapper mapper;

        public CityController(IUnitOfWork _uow, IMapper _mapper) { 
            this.uow    = _uow;
            this.mapper = _mapper;
        } 

        [HttpGet]
        public async Task<IActionResult> GetCities() {
            throw new UnauthorizedAccessException();
            var cities = await uow.cityRepository.GetCitiesAsync();
            var citiesDto = this.mapper.Map<IEnumerable<CityDto>>(cities);

            return Ok(citiesDto); 
        }

        // Post api/city/post -- Post data in JSON format
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto) {
            var city = this.mapper.Map<City>(cityDto);
            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = DateTime.Now;

            uow.cityRepository.AddCity(city);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        // Put api/city/update -- Put data in JSON format
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityDto cityDto) {
            if (id != cityDto.Id)
                return BadRequest("Update not allowed");

            var cityFromDb = await uow.cityRepository.FindCity(id);

            if (cityFromDb == null)
                return BadRequest("Update not allowed");


            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;

            mapper.Map(cityDto, cityFromDb);
            throw new Exception("Some unknown error occured");
            await uow.SaveAsync();
            return StatusCode(201);
        }

        // Put api/city/updateCityName -- Put data in JSON format
        [HttpPut("updateCityName/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityUpdateDto cityDto) {
            var cityFromDb = await uow.cityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;

            mapper.Map(cityDto, cityFromDb);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        // Patch api/city/update -- Patch data in JSON format
        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateCityPatch(int id, JsonPatchDocument<City> cityToPatch) {
            var cityFromDb = await uow.cityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;

            //mapper.Map(cityToPatch, cityFromDb);
            cityToPatch.ApplyTo(cityFromDb, ModelState);
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

    }
}
