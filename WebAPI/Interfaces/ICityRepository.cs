using Microsoft.AspNetCore.Components.Server.Circuits;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetCitiesAsync();

        void AddCity(City _city);

        void DeleteCity(int _cityId);

        Task<City> FindCity(int id);

        //Task<bool> SaveAsync();
    }
}
