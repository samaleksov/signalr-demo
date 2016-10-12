namespace SignalRDemo.MappingProfiles
{
    using AutoMapper;
    using Domain;
    using Models;

    public class DomainProfile : Profile
    {
        public DomainProfile()
        {
            CreateMap<UserModel, User>();
            CreateMap<User, UserModel>();

            CreateMap<CounterModel, Counter>();
            CreateMap<Counter, CounterModel>();
        }
    }
}
