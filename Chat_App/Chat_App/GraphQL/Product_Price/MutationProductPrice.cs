using PTShop_CMS.Models;

namespace PTShop_CMS.GrapQL.Product_Price
{
    [ExtendObjectType("Mutation")]
    public class MutationProductPrice
    {
        [UseDbContext(typeof(DatabaseContext))]
        public async Task<Models.ProductPrice> AddProductPriceAsync([ScopedService] DatabaseContext context, ProductPriceType item)
        {
            var obj = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.ProductPrice>(item.input);
            var id = obj.Id;
            if (id == 0)
            {
                var productPrice = new Models.ProductPrice
                {
                    ProductId = obj.ProductId,
                    CreatedAt = DateTime.Now,
                    Price = obj.Price,
                };
                context.ProductPrices.Add(productPrice);
                await context.SaveChangesAsync();
                return productPrice;
            }
            else
            {
                var productPrice = context.ProductPrices.Find(id);
                productPrice.ProductId = obj.ProductId;
                productPrice.CreatedAt = DateTime.Now;
                productPrice.Price = obj.Price;
                await context.SaveChangesAsync();
                return productPrice;
            }
        }

        [UseDbContext(typeof(DatabaseContext))]
        public async Task<bool> DeleteProductPriceAsync([ScopedService] DatabaseContext context, int id)
        {
            if (id > 0)
            {
                var productPrice = context.ProductPrices.Find(id);
                context.ProductPrices.Remove(productPrice);
                await context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
