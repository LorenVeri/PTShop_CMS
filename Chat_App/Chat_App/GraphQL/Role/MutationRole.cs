using PTShop_CMS.Models;

namespace PTShop_CMS.GraphQL.Role
{
    [ExtendObjectType("Mutation")]
    public class MutationRole
    {
        [UseDbContext(typeof(DatabaseContext))]
        public async Task<bool> CreateRoleAsync([ScopedService] DatabaseContext context, RoleType item)
        {
            int id = item.Id;
            if (id == 0)
            {
                var role = new Models.Role
                {
                    Name = item.Name,
                    CreatedAt = DateTime.Now
                };

                context.Roles.Add(role);
                await context.SaveChangesAsync();
                return true;
            }
            else
            {
                var role = context.Roles.FirstOrDefault(x => x.Id == id);
                if (role == null)
                {
                    return false;
                }
                else
                {
                    role.Name = item.Name;
                    await context.SaveChangesAsync();
                    return true;
                }
            }
        }

        [UseDbContext(typeof(DatabaseContext))]
        public async Task<bool> DeleteRoleAsync([ScopedService] DatabaseContext context, int id)
        {
            if (id > 0)
            {
                var role = context.Roles.FirstOrDefault(x => x.Id == id);
                if (role == null)
                {
                    return false;
                }
                else
                {
                    context.Roles.Remove(role);
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
