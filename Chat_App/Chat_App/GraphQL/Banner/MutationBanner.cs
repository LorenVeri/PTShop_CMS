using PTShop_CMS.Models;

namespace PTShop_CMS.GraphQL.Banner
{
    [ExtendObjectType("Mutation")]
    public class MutationBanner
    {
        //[UseDbContext(typeof(DatabaseContext))]
        //public async Task<Models.Banner> CreateBannerAsync([ScopedService] DatabaseContext context, BannerType item)
        //{
        //    var obj = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Banner>(item.input);
        //    var id = obj.Id;
        //    if (id == 0)
        //    {
        //        var banner = new Models.Banner()
        //        {
        //            Name = obj.Name,
        //            Title = obj.Title,
        //            Uri = obj.Uri
        //        };

        //        context.Banners.Add(banner);
        //        await context.SaveChangesAsync();
        //        return banner;
        //    }
        //    else
        //    {
        //        var banner = context.Banners.FirstOrDefault(c => c.Id == id);
        //        if (banner == null)
        //        {
        //            return null;
        //        }
        //        else
        //        {
        //            banner.Name = obj.Name;
        //            banner.Title = obj.Title;
        //            banner.Uri = obj.Uri;
        //            await context.SaveChangesAsync();
        //            return banner;
        //        }
        //    }
        //}

        [UseDbContext(typeof(DatabaseContext))]
        public async Task<bool> DeleteBannerAsync([ScopedService] DatabaseContext context, int id)
        {
            if (id > 0)
            {
                var banner = context.Banners.FirstOrDefault(c => c.Id == id);
                if (banner == null)
                {
                    return false;
                }
                else
                {
                    context.Banners.Remove(banner);
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
