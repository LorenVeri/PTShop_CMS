namespace PTShop_CMS.GraphQL.Admin
{
    public class DeleteAdminType
    {
        public class ListAdmin
        {
            public List<AdminDeleteType> ListAdminDeleteType { get; set; }
        }

        public class AdminDeleteType
        {
            public int Id { get; set; }
        }
    }
}
