using Microsoft.EntityFrameworkCore;
using PTShop_CMS.GraphQL.Admin;
using PTShop_CMS.GraphQL.AdminGroup;
using PTShop_CMS.GraphQL.Banner;
using PTShop_CMS.GraphQL.Contact;
using PTShop_CMS.GraphQL.Coupon;
using PTShop_CMS.GraphQL.Role;
using PTShop_CMS.GraphQL.Transaction;
using PTShop_CMS.GraphQL.TransactionProcessing;
using PTShop_CMS.GrapQL.Category;
using PTShop_CMS.GrapQL.Product;
using PTShop_CMS.GrapQL.Product_Media;
using PTShop_CMS.GrapQL.Product_Price;
using PTShop_CMS.Models;
using PTShop_CMS.SignalR.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var connectionString = builder.Configuration.GetConnectionString("DatabaseConnection");
builder.Services.AddPooledDbContextFactory<DatabaseContext>(o => o.UseSqlServer(connectionString));
//Scaffold-DbContext "Server=DESKTOP-AMJ7HPS;Database=PTSHOP;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Context DatabaseContext -force

builder.Services.AddSignalR();

var enviroment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIROMENT");

builder.Services.AddRazorPages()
    .AddRazorRuntimeCompilation();


//CORS 
var AllowAll = "_AllowAll";

builder.Services.AddCors(options =>
{
    options.AddPolicy(
            name: AllowAll,
            policy =>
            {
                policy.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
});

builder.Services
        .AddGraphQLServer()
        .AddQueryType(x => x.Name("Query"))
        .AddTypeExtension<QueryCategory>()
        .AddTypeExtension<QueryBanner>()
        .AddTypeExtension<QueryContact>()
        .AddTypeExtension<QueryCoupon>()
        .AddTypeExtension<QueryProduct>()
        .AddTypeExtension<QueryProductPrice>()
        .AddTypeExtension<QueryProductMedia>()
        .AddTypeExtension<QueryAdmin>()
        .AddTypeExtension<QueryAdminGroup>()
        .AddTypeExtension<QueryRole>()
        .AddTypeExtension<QueryTransaction>()
        .AddMutationType(x => x.Name("Mutation"))
        .AddTypeExtension<MutationCategory>()
        .AddTypeExtension<MutationBanner>()
        .AddTypeExtension<MutationContact>()
        .AddTypeExtension<MutationCounpon>()
        .AddTypeExtension<MutationProduct>()
        .AddTypeExtension<MutationProductPrice>()
        .AddTypeExtension<MutationProductMedia>()
        .AddTypeExtension<MutationAdmin>()
        .AddTypeExtension<MutationAdminGroup>()
        .AddTypeExtension<MutationRole>()
        .AddTypeExtension<MutationTransaction>()
        .AddTypeExtension<MutationTransactionProcessing>()
        .AddProjections()
        .AddFiltering()
        .AddSorting();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCors(AllowAll);
app.UseRouting();

app.MapHub<ChatHub>("/chatHub");
app.UseAuthorization();

app.MapControllerRoute(
        name: "DetailRole",
        defaults: new { controller = "AdminManager", action = "DetailRole" },
        pattern: "chi-tiet/{id}");

app.MapControllerRoute(
        name: "DetailAdmin",
        defaults: new { controller = "AdminManager", action = "DetailAdmin" },
        pattern: "admin/{id}");

app.MapControllerRoute(
        name: "DetailOrder",
        defaults: new { controller = "Order", action = "DetailOrder" },
        pattern: "/hoa-don/{id}");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Login}/{action=Index}/{id?}");

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    //endpoints.MapHub<ChatHub>("/chatHub");
    endpoints.MapGraphQL();
});

app.Run();
