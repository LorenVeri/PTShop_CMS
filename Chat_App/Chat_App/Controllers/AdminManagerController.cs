using Microsoft.AspNetCore.Mvc;

namespace PTShop_CMS.Controllers
{
    public class AdminManagerController : Controller
    {
        [Route("quan-tri-tai-khoan")]
        public IActionResult Admin()
        {
            return View();
        }

        //[Route("chi-tiet-tai-khoan")]
        public IActionResult DetailAdmin()
        {
            return View();
        }

        [Route("chuc-vu")]
        public IActionResult Role()
        {
            return View();
        }

        //[Route("chi-tiet/")]
        public IActionResult DetailRole()
        {
            return View();
        }

        [Route("phan-quyen")]
        public IActionResult Permissions()
        {
            return View();
        }
    }
}
