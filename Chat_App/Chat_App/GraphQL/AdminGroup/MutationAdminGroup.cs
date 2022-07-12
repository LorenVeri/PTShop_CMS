using Microsoft.EntityFrameworkCore;
using PTShop_CMS.Models;

namespace PTShop_CMS.GraphQL.AdminGroup
{
    [ExtendObjectType("Mutation")]
    public class MutationAdminGroup
    {
        [UseDbContext(typeof(DatabaseContext))]
        public async Task<String> CreateAdminGroupAsync([ScopedService] DatabaseContext context, AdminGroupType item)
        {
            int id = item.Id;
            if (id == 0)
            {
                var adminGroup = new Models.AdminGroup
                {
                    Name = item.Name,
                    CreatedAt = DateTime.Now,
                    Code = item.Code,
                };

                context.AdminGroups.Add(adminGroup);
                await context.SaveChangesAsync();

                var adminGroupId = adminGroup.Id;
                foreach (var permiss in item.ListPermissions)
                {
                    var permission = new Models.Permission
                    {
                        AdminGroupId = adminGroupId,
                        RoleId = permiss.RoleId
                    };
                    context.Permissions.Add(permission);
                    await context.SaveChangesAsync();
                }

                return "true";
            }
            else
            {
                var adminGroup = context.AdminGroups.Include(z => z.Permissions).FirstOrDefault(x => x.Id == id);
                adminGroup.Name = item.Name;
                adminGroup.Code = item.Code;

                var adminGroupId = adminGroup.Id;
                foreach (var permiss in item.ListPermissions)
                {
                    var listAdminGroupId = adminGroup.Permissions.Select(z => z.AdminGroupId).ToArray();
                    var existPermission = context.Permissions.FirstOrDefault(x => x.AdminGroupId == adminGroupId && x.RoleId == permiss.RoleId);
                    if (existPermission == null)
                    {
                        var permission = new Models.Permission
                        {
                            AdminGroupId = adminGroupId,
                            RoleId = permiss.RoleId
                        };
                        context.Permissions.Add(permission);
                        await context.SaveChangesAsync();

                    }
                    await context.SaveChangesAsync();

                }
                return "true";
            }
        }


        [UseDbContext(typeof(DatabaseContext))]
        public async Task<bool> DeletePermissionAsync([ScopedService] DatabaseContext context, int id)
        {
            var permission = context.Permissions.Find(id);
            if (permission == null)
            {
                return false;
            }
            else
            {
                context.Permissions.Remove(permission);
                await context.SaveChangesAsync();
                return true;
            }
        }

        [UseDbContext(typeof(DatabaseContext))]
        public async Task<bool> DeleteAdminGroupAsync([ScopedService] DatabaseContext context, int id)
        {
            var adminGroup = context.AdminGroups.Include(x => x.Permissions).FirstOrDefault(x => x.Id == id);
            if (adminGroup == null)
            {
                return false;
            }
            else
            {
                foreach (var device in adminGroup.Permissions)
                {
                    var obj = context.Permissions.FirstOrDefault(x => x.AdminGroupId == id);
                    context.Remove(obj);
                }
                context.Remove(adminGroup);
                await context.SaveChangesAsync();
                return true;
            }
        }
    }
}
