using PTShop_CMS.Models;

namespace PTShop_CMS.GraphQL.AdminGroup
{
    [ExtendObjectType("Query")]
    public class QueryAdminGroup
    {
        [UseDbContext(typeof(DatabaseContext))]
        [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Models.AdminGroup> GetAdminGroup([ScopedService] DatabaseContext context)
        {
            IQueryable<Models.AdminGroup> query = context.AdminGroups.AsQueryable();
            return query;
        }
    }
}
