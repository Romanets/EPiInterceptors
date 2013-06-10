using System.Web.Mvc;
using EPiServer.Web.Mvc;
using EPiServerMvcSite.Models.Blocks;

namespace EPiServerMvcSite.Controllers
{
    public class SampleBlockController : BlockController<SampleBlock>
    {
        public override ActionResult Index(SampleBlock currentBlock)
        {
            return PartialView(currentBlock);
        }
    }
}
