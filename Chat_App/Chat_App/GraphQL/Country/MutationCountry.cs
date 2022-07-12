using PTShop_CMS.Models;

namespace PTShop_CMS.GrapQL.Country
{
    [ExtendObjectType("Mutation")]
    public class MutationCountry
    {
        [UseDbContext(typeof(DatabaseContext))]
        public Models.Country AddCountry([ScopedService] DatabaseContext context, CountryType item)
        {
            var id = item.Code;
            if (id == 0)
            {
                var country = new Models.Country
                {
                    Name = item.Name,
                    CreateAt = DateTime.Now,
                    UpdateAt = DateTime.Now
                };
                context.Countries.Add(country);
                context.SaveChanges();
                return country;
            }
            else
            {
                var country = context.Countries.Find(id);
                country.Name = item.Name;
                country.UpdateAt = DateTime.Now;
                context.SaveChanges();
                return country;
            }
        }
    }
}
