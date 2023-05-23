using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext dc;
        public CityRepository(DataContext _dc)
        {
            this.dc = _dc;
        }

        public void AddCity(City _city) {
            this.dc.AddAsync(_city);
        }

        public void DeleteCity(int _cityID) {
            var city = this.dc.Cities!.Find(_cityID);
            this.dc.Cities.Remove(city!);
        }

        public async Task<IEnumerable<City>> GetCitiesAsync() {
            return await this.dc.Cities!.ToListAsync();
        }

        public async Task<bool> SaveAsync() {
            return await this.dc.SaveChangesAsync() > 0;
        }
    }
}
