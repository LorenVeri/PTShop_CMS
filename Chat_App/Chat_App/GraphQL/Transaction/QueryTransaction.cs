using PTShop_CMS.Models;
using System.Globalization;

namespace PTShop_CMS.GraphQL.Transaction
{
    [ExtendObjectType("Query")]
    public class QueryTransaction
    {
        [UseDbContext(typeof(DatabaseContext))]
        [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Models.Transaction> GetTransaction([ScopedService] DatabaseContext context)
        {
            IQueryable<Models.Transaction> query = context.Transactions.AsQueryable();
            return query;
        }


        public DateTime convertDate(string item)
        {
            return DateTime.ParseExact(item, "dd/MM/yyyy", CultureInfo.InvariantCulture);
        }

        [UseDbContext(typeof(DatabaseContext))]
        [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Models.Transaction> GetTransactionByMonth([ScopedService] DatabaseContext context, string startDay, string endDay)
        {
            IQueryable<Models.Transaction> query;
            if (startDay.Length != 0 && endDay.Length != 0)
            {
                query = context.Transactions.Where(x => x.CreatedAt >= convertDate(startDay) && x.CreatedAt <= convertDate(endDay)).AsQueryable();
            }
            else
            {
                return null;
            }
            query = context.Transactions.AsQueryable();

            return query;
        }
    }
}
