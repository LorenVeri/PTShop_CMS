using PTShop_CMS.Models;

namespace PTShop_CMS.GraphQL.User
{
    [ExtendObjectType("Query")]
    public class QueryUser
    {
        [UseDbContext(typeof(DatabaseContext))]
        [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Models.User> GetUser([ScopedService] DatabaseContext context)
        {
            IQueryable<Models.User> query = context.Users.AsQueryable();
            return query;
        }
    }
}
