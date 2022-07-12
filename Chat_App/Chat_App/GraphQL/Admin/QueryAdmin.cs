using PTShop_CMS.Models;
using System.Security.Cryptography;
using System.Text;

namespace PTShop_CMS.GraphQL.Admin
{
    [ExtendObjectType("Query")]
    public class QueryAdmin
    {
        [UseDbContext(typeof(DatabaseContext))]
        [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Models.Admin> GetAdmin([ScopedService] DatabaseContext context)
        {
            IQueryable<Models.Admin> query = context.Admins.AsQueryable();
            return query;
        }

        private string GetMD5HashData(string data)
        {
            //create new instance of md5
            MD5 md5 = MD5.Create();

            //convert the input text to array of bytes
            byte[] hashData = md5.ComputeHash(Encoding.Default.GetBytes(data));

            //create new instance of StringBuilder to save hashed data
            StringBuilder returnValue = new StringBuilder();

            //loop for each byte and add it to StringBuilder
            for (int i = 0; i < hashData.Length; i++)
            {
                returnValue.Append(hashData[i].ToString());
            }

            // return hexadecimal string
            return returnValue.ToString();

        }

        [UseDbContext(typeof(DatabaseContext))]
        [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Models.Admin> GetLogin([ScopedService] DatabaseContext context, AdminType item)
        {
            if (item != null)
            {
                var obj = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Admin>(item.input);
                IQueryable<Models.Admin> query = context.Admins.Where(x => x.Email == obj.Email && x.Password == GetMD5HashData(obj.Password));
                if (query == null)
                {
                    return null;
                }
                else
                {
                    //Session.Add(CommonConstans.ADMIN_SESSION, );
                    return query;
                }
            }
            else
            {
                return null;
            }
        }
    }
}
