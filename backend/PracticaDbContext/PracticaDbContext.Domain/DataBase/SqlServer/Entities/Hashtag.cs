using System;
using System.Collections.Generic;

namespace PracticaDbContext.Domain.Database.SqlServer.Entities;

public partial class Hashtag
{
    public Guid Id { get; set; }

    public string Texto { get; set; } = null!;

    public virtual ICollection<PostHashtag> PostHashtags { get; set; } = new List<PostHashtag>();
}
