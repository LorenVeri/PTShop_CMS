using PTShop_CMS.Models;

namespace PTShop_CMS.GrapQL.Product_Price
{
    [ExtendObjectType("Query")]
    public class QueryProductPrice
    {
        [UseDbContext(typeof(DatabaseContext))]
        [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Models.ProductPrice> GetProductPrice([ScopedService] DatabaseContext context)
        {
            IQueryable<Models.ProductPrice> query = context.ProductPrices.AsQueryable();
            return query;
        }
    }
}
