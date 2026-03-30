using System;
using System.Collections.Generic;

namespace PracticaDbContext.Domain.Database.SqlServer.Entities;

public partial class Country
{
    public Guid Id { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<City> Cities { get; set; } = new List<City>();
}
