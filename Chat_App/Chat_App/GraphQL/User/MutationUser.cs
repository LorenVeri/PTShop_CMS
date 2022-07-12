using PTShop_CMS.Models;

namespace PTShop_CMS.GraphQL.User
{
    [ExtendObjectType("Mutation")]
    public class MutationUser
    {
        [UseDbContext(typeof(DatabaseContext))]
        public async Task<bool> CreateUserAsync([ScopedService] DatabaseContext context, UserType item)
        {
            var obj = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.User>(item.input);
            var id = obj.Id;
            if (id == 0)
            {
                var user = new Models.User
                {
                    Id = obj.Id,
                };

                context.Users.Add(user);
                await context.SaveChangesAsync();
                return true;
            }
            else
            {
                var user = context.Users.FirstOrDefault(x => x.Id == id);
                if (user == null)
                {
                    return false;
                }
                else
                {
                    user.Id = obj.Id;

                    await context.SaveChangesAsync();
                    return true;
                }
            }
        }
    }
}
