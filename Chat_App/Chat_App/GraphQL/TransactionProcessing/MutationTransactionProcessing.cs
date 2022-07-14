using PTShop_CMS.Models;

namespace PTShop_CMS.GraphQL.TransactionProcessing
{
    [ExtendObjectType("Mutation")]
    public class MutationTransactionProcessing
    {
        [UseDbContext(typeof(DatabaseContext))]
        public async Task<string> CreateTransactionProcessingAsync([ScopedService] DatabaseContext context, TransactionProcessingType item)
        {
            var id = item.Id;
            if (id == 0)
            {
                var obj = new Models.TransactionProcessing
                {
                    AdminId = item.AdminId,
                    TransactionId = item.TransactionId
                };
                context.TransactionProcessings.Add(obj);
                await context.SaveChangesAsync();
                return "Thành công";
            }
            return "Thất bại";

        }
    }
}
