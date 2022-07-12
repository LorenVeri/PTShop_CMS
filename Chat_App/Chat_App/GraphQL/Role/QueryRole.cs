using PTShop_CMS.Models;

namespace PTShop_CMS.GraphQL.Role
{
    [ExtendObjectType("Query")]
    public class QueryRole
    {
        [UseDbContext(typeof(DatabaseContext))]
        [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Models.Role> GetRole([ScopedService] DatabaseContext context)
        {
            IQueryable<Models.Role> query = context.Roles.AsQueryable();
            return query;
        }
    }
}
