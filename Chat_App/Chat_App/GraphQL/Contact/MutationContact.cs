using PTShop_CMS.Models;

namespace PTShop_CMS.GraphQL.Contact
{
    [ExtendObjectType("Mutation")]
    public class MutationContact
    {
        [UseDbContext(typeof(DatabaseContext))]
        public async Task<Models.Contact> AddContactAsync([ScopedService] DatabaseContext context, BannerType item)
        {
            var obj = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Contact>(item.input);
            var id = obj.Id;
            if (id == 0)
            {
                var contact = new Models.Contact()
                {
                    Name = obj.Name,
                    Address = obj.Address,
                    Closetime = obj.Closetime,
                    Email = obj.Email,
                    Phone = obj.Phone,
                    Opentime = obj.Opentime
                };

                context.Contacts.Add(contact);
                await context.SaveChangesAsync();
                return contact;
            }
            else
            {
                var contact = context.Contacts.FirstOrDefault(c => c.Id == id);
                if (contact == null)
                {
                    return null;
                }
                else
                {
                    contact.Name = obj.Name;
                    contact.Address = obj.Address;
                    contact.Closetime = obj.Closetime;
                    contact.Email = obj.Email;
                    contact.Phone = obj.Phone;
                    contact.Opentime = obj.Opentime;
                    await context.SaveChangesAsync();
                    return contact;
                }
            }
        }

        [UseDbContext(typeof(DatabaseContext))]
        public async Task<bool> DeleteContactAsync([ScopedService] DatabaseContext context, int id)
        {
            if (id > 0)
            {
                var contact = context.Contacts.FirstOrDefault(c => c.Id == id);
                if (contact == null)
                {
                    return false;
                }
                else
                {
                    context.Contacts.Remove(contact);
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
