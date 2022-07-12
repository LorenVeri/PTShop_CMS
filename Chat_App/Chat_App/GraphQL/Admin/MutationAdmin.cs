using PTShop_CMS.Models;
using System.Security.Cryptography;
using System.Text;
using static PTShop_CMS.GraphQL.Admin.DeleteAdminType;

namespace PTShop_CMS.GraphQL.Admin
{
    [ExtendObjectType("Mutation")]
    public class MutationAdmin
    {
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
        public async Task<String> CreateAdminAsync([ScopedService] DatabaseContext context, AdminType item)
        {
            var obj = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Admin>(item.input);
            var id = obj.Id;
            if (id == 0)
            {
                var checkExistEmail = context.Admins.FirstOrDefault(ad => ad.Email == obj.Email);
                if (checkExistEmail == null)
                {
                    var admin = new Models.Admin()
                    {
                        FirstName = obj.FirstName,
                        LastName = obj.LastName,
                        Email = obj.Email,
                        Phone = obj.Phone,
                        Avatar = "/dist/assets/media/avatars/150-1.jpg",
                        Password = GetMD5HashData(obj.Password),
                        AdminGroupId = 3,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    };
                    context.Admins.Add(admin);
                    await context.SaveChangesAsync();
                    return "Thành công";
                }
                else
                {
                    return "Email đã tồn tại";
                }
            }
            else
            {
                var admin = context.Admins.FirstOrDefault(c => c.Id == id);
                if (admin == null)
                {
                    return "Thất bại";
                }
                else
                {
                    admin.FirstName = obj.FirstName;
                    admin.LastName = obj.LastName;
                    admin.Email = obj.Email;
                    admin.Phone = obj.Phone;
                    admin.Avatar = obj.Avatar;
                    admin.AdminGroupId = obj.AdminGroupId;
                    admin.Password = GetMD5HashData(obj.Password);
                    admin.UpdatedAt = DateTime.Now;
                    await context.SaveChangesAsync();
                    return "Thành công";
                }
            }
        }

        [UseDbContext(typeof(DatabaseContext))]
        public async Task<bool> DeleteAdminAsync([ScopedService] DatabaseContext context, int id)
        {

            if (id > 0)
            {
                var admin = context.Admins.FirstOrDefault(c => c.Id == id);
                context.Admins.Remove(admin);
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
