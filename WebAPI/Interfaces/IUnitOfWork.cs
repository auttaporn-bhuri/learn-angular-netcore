namespace WebAPI.Interfaces
{
    public interface IUnitOfWork
    {
        ICityRepository cityRepository { get; }
        IUserRepository userRepository { get; }
        Task<bool> SaveAsync();
    }
}
