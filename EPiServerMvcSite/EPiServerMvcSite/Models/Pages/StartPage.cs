using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServerMvcSite.Models.Blocks;

namespace EPiServerMvcSite.Models.Pages
{
    [ContentType(GUID = "1FF1BD09-F2D7-4D7C-BA61-6ED1ACADE9CC", GroupName = "Common")]
    public class StartPage : PageData
    {
        /*public override object this[string index]
        {
            get
            {
                 object value = base[index];
                 return value;
            }
            set
            {
                base[index] = value;
            }
        }*/

        //public override PropertyDataCollection Property
        //{
        //    get
        //    {
        //       var property = base.Property;
        //       return property;

        //    }
        //    protected set
        //    {
        //        base.Property = value;
        //    }
        //}

        [Display(Name = "Title", GroupName = SystemTabNames.Content)]
        public virtual string MainTitle { get; set; }

        [Display(Name = "Body", GroupName = SystemTabNames.Content)]
        public virtual XhtmlString MainBody { get; set; }

        [Display(Name = "Description", GroupName = SystemTabNames.Settings)]
        [DefaultValue("Default description.")]
        public virtual string Description { get; set; }

        [DefaultValue("Default value of sample property.")]
        public virtual string SampleProperty { get; set; }

        public virtual SampleBlock SampleBlock { get; set; }

        //[Display(Name = "Content Area",
        //    Description = "A content for adding any shared block",
        //    GroupName = SystemTabNames.Content)]
        //public virtual ContentArea ContentArea { get; set; }
    }
}