using PTShop_CMS.Models;

namespace PTShop_CMS.GrapQL.Product
{
    [ExtendObjectType("Mutation")]
    public class MutationProduct
    {
        [UseDbContext(typeof(DatabaseContext))]
        public async Task<Models.Product> AddProductAsync([ScopedService] DatabaseContext context, ProductType item)
        {
            var obj = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Product>(item.input);
            var id = obj.Id;
            if (id == 0)
            {
                var product = new Models.Product
                {
                    Name = obj.Name,
                    Description = obj.Description,
                    MadeIn = obj.MadeIn,
                    Price = obj.Price,
                    CategoryId = obj.CategoryId,
                    IsDelete = obj.IsDelete,
                    Status = obj.Status,
                    CreateAt = DateTime.Now,
                    ManufacturerId = obj.ManufacturerId,
                    Sale = obj.Sale,
                    UpdateAt = DateTime.Now
                };

                context.Products.Add(product);
                await context.SaveChangesAsync();
                return product;
            }
            else
            {
                var product = context.Products.FirstOrDefault(x => x.Id == id);
                if (product == null)
                {
                    return null;
                }
                else
                {
                    product.Name = obj.Name;
                    product.Description = obj.Description;
                    product.MadeIn = obj.MadeIn;
                    product.Price = obj.Price;
                    product.UpdateAt = DateTime.Now;
                    product.CategoryId = obj.CategoryId;
                    product.IsDelete = obj.IsDelete;
                    product.Status = obj.Status;
                    product.Sale = obj.Sale;
                    product.ManufacturerId = obj.ManufacturerId;
                }
                await context.SaveChangesAsync();
                return product;
            }

        }

        [UseDbContext(typeof(DatabaseContext))]
        public async Task<bool> DeleteProjectAsync([ScopedService] DatabaseContext context, ProductType item)
        {
            var obj = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Product>(item.input);
            var id = obj.Id;
            if (id > 0)
            {
                var product = context.Products.FirstOrDefault(p => p.Id == id);

                context.Products.Remove(product);
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
