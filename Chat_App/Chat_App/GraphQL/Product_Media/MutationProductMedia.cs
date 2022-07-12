using PTShop_CMS.Models;

namespace PTShop_CMS.GrapQL.Product_Media
{
    [ExtendObjectType("Mutation")]
    public class MutationProductMedia
    {
        [UseDbContext(typeof(DatabaseContext))]
        public async Task<Models.ProductMedium> AddProductMediaAsync([ScopedService] DatabaseContext context, ProductMediaType item)
        {
            var obj = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.ProductMedium>(item.input);
            var id = obj.Id;
            if (id == 0)
            {
                var productMedia = new Models.ProductMedium
                {
                    ProductId = obj.ProductId,
                    Uri = obj.Uri
                };
                context.ProductMedia.Add(productMedia);
                await context.SaveChangesAsync();
                return productMedia;
            }
            else
            {
                var productMedia = context.ProductMedia.Find(id);
                productMedia.ProductId = obj.ProductId;
                productMedia.Uri = obj.Uri;
                await context.SaveChangesAsync();
                return productMedia;
            }
        }

        [UseDbContext(typeof(DatabaseContext))]
        public async Task<bool> DeleteProductMediaAsync([ScopedService] DatabaseContext context, int id)
        {
            if (id > 0)
            {
                var productMedia = context.ProductMedia.Find(id);
                context.ProductMedia.Remove(productMedia);
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
