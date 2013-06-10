using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;

namespace EPiServerMvcSite.Models.Blocks
{
    [ContentType(GUID = "D9C2D575-6813-4633-B559-0D42A8E07C9C", GroupName = "Common")]
    public class SampleBlock : BlockData
    {
        [Display(Name = "TestMe", GroupName = SystemTabNames.Content)]
        [DefaultValue("Default Sample Block Title")]
        public virtual string TestMe { get; set; }

        [Display(Name = "Body", GroupName = SystemTabNames.Content)]
        public virtual XhtmlString Body { get; set; }
    }
}