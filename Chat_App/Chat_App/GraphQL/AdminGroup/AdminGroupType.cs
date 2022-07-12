namespace PTShop_CMS.GraphQL.AdminGroup
{
    public class AdminGroupType
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }

        public List<Permission> ListPermissions { get; set; }
    }

    public class Permission
    {
        public int Id { get; set; }
        public int AdminGroupId { get; set; }
        public int RoleId { get; set; }
    }
}
