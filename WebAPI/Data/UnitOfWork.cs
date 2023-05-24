using WebAPI.Data.Repo;
using WebAPI.Interfaces;

namespace WebAPI.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext dc;

        public UnitOfWork(DataContext _dc)
        {
            this.dc = _dc;
        }

        public ICityRepository cityRepository => new CityRepository(this.dc);

        public async Task<bool> SaveAsync() {
            return await this.dc.SaveChangesAsync() > 0;
        }
    }
}
