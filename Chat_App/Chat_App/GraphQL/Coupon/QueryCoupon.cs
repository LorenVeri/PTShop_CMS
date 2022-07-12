using PTShop_CMS.Models;

namespace PTShop_CMS.GraphQL.Coupon
{
    [ExtendObjectType("Query")]
    public class QueryCoupon
    {
        [UseDbContext(typeof(DatabaseContext))]
        [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Models.Coupon> GetCoupon([ScopedService] DatabaseContext context)
        {
            IQueryable<Models.Coupon> query = context.Coupons.AsQueryable();
            return query;
        }
    }
}
