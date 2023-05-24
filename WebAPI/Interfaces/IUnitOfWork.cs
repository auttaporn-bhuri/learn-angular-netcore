namespace WebAPI.Interfaces
{
    public interface IUnitOfWork
    {
        ICityRepository cityRepository { get; }
        Task<bool> SaveAsync();
    }
}
