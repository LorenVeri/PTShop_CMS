using PTShop_CMS.Models;

namespace PTShop_CMS.GrapQL.Category
{
    [ExtendObjectType("Mutation")]
    public class MutationCategory
    {
        [UseDbContext(typeof(DatabaseContext))]
        public async Task<Models.Category> AddCategoryAsync([ScopedService] DatabaseContext context, CategoryType item)
        {
            var obj = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Category>(item.input);
            var id = obj.Id;
            if (id == 0)
            {
                var category = new Models.Category()
                {
                    Name = obj.Name,
                    ParentId = obj.ParentId,
                    CreateAt = DateTime.Now,
                    UpdateAt = DateTime.Now
                };

                context.Categories.Add(category);
                await context.SaveChangesAsync();
                return category;
            }
            else
            {
                var categoy = context.Categories.FirstOrDefault(c => c.Id == id);
                if (categoy == null)
                {
                    return null;
                }
                else
                {
                    categoy.Name = obj.Name;
                    categoy.ParentId = obj.ParentId;
                    categoy.UpdateAt = DateTime.Now;
                    await context.SaveChangesAsync();
                    return categoy;
                }
            }
        }

        [UseDbContext(typeof(DatabaseContext))]
        public async Task<bool> DeleteCategoryAsync([ScopedService] DatabaseContext context, int id)
        {
            if (id > 0)
            {
                var category = context.Categories.FirstOrDefault(c => c.Id == id);
                context.Categories.Remove(category);
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
