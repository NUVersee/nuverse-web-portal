using System.Collections.Generic;

namespace NuVerse.Domain.DTOs
{
    public class CircuitLabDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public List<NodeDto> Nodes { get; set; } = new();

        public List<WireDto> Wires { get; set; } = new();
    }

    public class NodeDto
    {
        public string Id { get; set; } = string.Empty;
        public string Label { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty; // e.g., AND, OR, Resistor
        public double X { get; set; }
        public double Y { get; set; }
        public Dictionary<string, string> Properties { get; set; } = new();
    }

    public class WireDto
    {
        public string Id { get; set; } = string.Empty;
        public string FromNodeId { get; set; } = string.Empty;
        public string FromPort { get; set; } = string.Empty;
        public string ToNodeId { get; set; } = string.Empty;
        public string ToPort { get; set; } = string.Empty;
        public string Color { get; set; } = "#000000";
    }
}
