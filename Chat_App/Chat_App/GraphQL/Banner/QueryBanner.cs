using PTShop_CMS.Models;

namespace PTShop_CMS.GraphQL.Banner
{
    [ExtendObjectType("Query")]
    public class QueryBanner
    {
        [UseDbContext(typeof(DatabaseContext))]
        [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Models.Banner> GetBanner([ScopedService] DatabaseContext context)
        {
            IQueryable<Models.Banner> query = context.Banners.AsQueryable();
            return query;
        }
    }
}
