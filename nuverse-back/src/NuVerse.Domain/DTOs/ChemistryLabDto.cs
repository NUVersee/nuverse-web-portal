namespace NuVerse.Domain.DTOs
{
public class ChemistryLabDto
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public List<string> Steps { get; set; } = new();
}
}
