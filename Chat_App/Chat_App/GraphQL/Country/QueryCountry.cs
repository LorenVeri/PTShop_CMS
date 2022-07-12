using PTShop_CMS.Models;

namespace PTShop_CMS.GrapQL.Country
{
    [ExtendObjectType("Query")]
    public class QueryCountry
    {
        [UseDbContext(typeof(DatabaseContext))]
        [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Models.Country> GetCountry([ScopedService] DatabaseContext context)
        {
            IQueryable<Models.Country> query = context.Countries.AsQueryable();
            return query;
        }
    }
}
