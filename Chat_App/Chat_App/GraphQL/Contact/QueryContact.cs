using PTShop_CMS.Models;

namespace PTShop_CMS.GraphQL.Contact
{
    [ExtendObjectType("Query")]
    public class QueryContact
    {
        [UseDbContext(typeof(DatabaseContext))]
        [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Models.Contact> GetContact([ScopedService] DatabaseContext context)
        {
            IQueryable<Models.Contact> query = context.Contacts.AsQueryable();
            return query;
        }
    }
}
