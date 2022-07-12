namespace PTShop_CMS.GraphQL.Product
{
    public class SearchInput
    {
        public string Name { get; set; }
        public bool IsDelete { get; set; }
        public bool Sale { get; set; }
        public bool Status { get; set; }
    }

}
