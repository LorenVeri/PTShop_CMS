using Microsoft.EntityFrameworkCore;
using PTShop_CMS.Models;

namespace PTShop_CMS.GraphQL.Transaction
{
    [ExtendObjectType("Mutation")]
    public class MutationTransaction
    {
        [UseDbContext(typeof(DatabaseContext))]
        public async Task<String> CreateTransactionAsync([ScopedService] DatabaseContext context, TransactionType item)
        {
            var id = item.Id;
            if (id == 0)
            {
                var transaction = new Models.Transaction()
                {
                    UseId = item.UserId,
                    UserName = item.UserName,
                    UserEmail = item.UserEmail,
                    UserPhone = item.UserPhone,
                    UserAdress = item.UserAdress,
                    Passersby = item.Passersby,
                    Amount = item.Amount,
                    Message = item.Message,
                    //Payment = item.Payment,
                    //PaymentInfo = item.PaymentInfo,
                    //Security = item.Security,
                    TimeOut = 30,
                    State = item.State,
                    CreatedAt = DateTime.Now,
                };

                context.Transactions.Add(transaction);
                await context.SaveChangesAsync();

                var transactionId = transaction.Id;
                foreach (var order in item.listOrder)
                {
                    var obj = new Models.Order
                    {
                        TransactionId = transactionId,
                        ProductId = order.ProductId,
                        Count = order.Count,
                        AmountOrder = order.AmountOrder,
                        Status = order.Status
                    };
                    context.Orders.Add(obj);
                    await context.SaveChangesAsync();
                }
                return "Thành công";
            }
            else
            {
                var transaction = context.Transactions.Include(z => z.Orders).FirstOrDefault(c => c.Id == id);
                if (transaction == null)
                {
                    return "Thất bại";
                }
                else
                {
                    transaction.Passersby = item.Passersby;
                    transaction.State = item.State;
                    var transactionId = transaction.Id;
                    foreach (var order in item.listOrder)
                    {
                        var listTransactionId = transaction.Orders.Select(z => z.TransactionId).ToArray();
                        var existOrder = context.Orders.FirstOrDefault(x => x.TransactionId == transactionId && x.ProductId == order.ProductId);
                        if (existOrder == null)
                        {
                            var permission = new Models.Order
                            {
                                Status = order.Status
                            };
                            context.Orders.Add(permission);
                            await context.SaveChangesAsync();

                        }
                        else
                        {

                        }
                        await context.SaveChangesAsync();
                    }

                    await context.SaveChangesAsync();
                    return "Thành công";
                }
            }
        }

        [UseDbContext(typeof(DatabaseContext))]
        public async Task<bool> DeleteTransactionAsync([ScopedService] DatabaseContext context, int id)
        {
            var transaction = context.Transactions.Include(x => x.Orders).FirstOrDefault(x => x.Id == id);
            if (transaction == null)
            {
                return false;
            }
            else
            {
                foreach (var order in transaction.Orders)
                {
                    var obj = context.Orders.FirstOrDefault(x => x.Id == order.Id);
                    context.Remove(obj);
                }
                context.Remove(transaction);
                await context.SaveChangesAsync();
                return true;
            }
        }

    }
}
