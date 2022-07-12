using PTShop_CMS.Models;

namespace PTShop_CMS.GraphQL.Coupon
{
    [ExtendObjectType("Mutation")]
    public class MutationCounpon
    {
        [UseDbContext(typeof(DatabaseContext))]
        public async Task<Models.Coupon> AddCounponAsync([ScopedService] DatabaseContext context, CounponType item)
        {
            var obj = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Coupon>(item.input);
            var id = obj.Id;
            if (id == 0)
            {
                var counpon = new Models.Coupon()
                {
                    Code = obj.Code,
                    DiscountMoney = obj.DiscountMoney,
                    DiscountPercent = obj.DiscountPercent,
                    Expire = obj.Expire
                };

                context.Coupons.Add(counpon);
                await context.SaveChangesAsync();
                return counpon;
            }
            else
            {
                var counpon = context.Coupons.FirstOrDefault(c => c.Id == id);
                if (counpon == null)
                {
                    return null;
                }
                else
                {
                    counpon.Code = obj.Code;
                    counpon.DiscountMoney = obj.DiscountMoney;
                    counpon.DiscountPercent = obj.DiscountPercent;
                    counpon.Expire = obj.Expire;
                    await context.SaveChangesAsync();
                    return counpon;
                }
            }
        }

        [UseDbContext(typeof(DatabaseContext))]
        public async Task<bool> DeleteCounponAsync([ScopedService] DatabaseContext context, int id)
        {
            if (id > 0)
            {
                var banner = context.Coupons.FirstOrDefault(c => c.Id == id);
                if (banner == null)
                {
                    return false;
                }
                else
                {
                    context.Coupons.Remove(banner);
                    await context.SaveChangesAsync();
                    return true;
                }
            }
            else
            {
                return false;
            }
        }
    }
}
