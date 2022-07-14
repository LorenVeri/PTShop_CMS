using Microsoft.AspNetCore.Mvc;

namespace PTShop_CMS.Controllers
{
    public class OrderController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        //[Route("chi-tiet-hoa-don")]
        public IActionResult DetailOrder()
        {
            return View();
        }
    }
}
