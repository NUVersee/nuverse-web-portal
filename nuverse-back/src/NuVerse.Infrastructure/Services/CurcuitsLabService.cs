using NuVerse.Application.Interfaces.Repositories;
using NuVerse.Domain.DTOs;

namespace NuVerse.Infrastructure.Services
{
    public class CircuitLabService : ICircuitLabService
    {
        private readonly List<CircuitLabDto> _labs = new()
        {
            new CircuitLabDto
            {
                Id = 1,
                Title = "Simple LED Circuit",
                Description = "A battery powering an LED via a resistor.",
                Nodes = new List<NodeDto>
                {
                    new NodeDto { Id = "battery", Label = "Battery", Type = "VoltageSource", X = 50, Y = 50, Properties = { { "Voltage", "9" } } },
                    new NodeDto { Id = "resistor", Label = "Resistor", Type = "Resistor", X = 150, Y = 50, Properties = { { "Resistance", "220" } } },
                    new NodeDto { Id = "led", Label = "LED", Type = "Diode", X = 250, Y = 50 }
                },
                Wires = new List<WireDto>
                {
                    new WireDto { Id = "w1", FromNodeId = "battery", FromPort = "+", ToNodeId = "resistor", ToPort = "a" },
                    new WireDto { Id = "w2", FromNodeId = "resistor", FromPort = "b", ToNodeId = "led", ToPort = "anode" },
                    new WireDto { Id = "w3", FromNodeId = "led", FromPort = "cathode", ToNodeId = "battery", ToPort = "-" }
                }
            },

            new CircuitLabDto
            {
                Id = 2,
                Title = "LED with Switch",
                Description = "A battery powers an LED through a switch.",
                Nodes = new List<NodeDto>
                {
                    new NodeDto { Id = "battery", Label = "Battery", Type = "VoltageSource", X = 50, Y = 50, Properties = { { "Voltage", "9" } } },
                    new NodeDto { Id = "switch", Label = "Switch", Type = "Switch", X = 150, Y = 50 },
                    new NodeDto { Id = "led", Label = "LED", Type = "Diode", X = 250, Y = 50 }
                },
                Wires = new List<WireDto>
                {
                    new WireDto { Id = "w1", FromNodeId = "battery", FromPort = "+", ToNodeId = "switch", ToPort = "a" },
                    new WireDto { Id = "w2", FromNodeId = "switch", FromPort = "b", ToNodeId = "led", ToPort = "anode" },
                    new WireDto { Id = "w3", FromNodeId = "led", FromPort = "cathode", ToNodeId = "battery", ToPort = "-" }
                }
            },

            new CircuitLabDto
            {
                Id = 3,
                Title = "Series Resistors",
                Description = "Two resistors connected in series to a battery.",
                Nodes = new List<NodeDto>
                {
                    new NodeDto { Id = "battery", Label = "Battery", Type = "VoltageSource", X = 50, Y = 50, Properties = { { "Voltage", "9" } } },
                    new NodeDto { Id = "resistor1", Label = "Resistor 1", Type = "Resistor", X = 150, Y = 50, Properties = { { "Resistance", "100" } } },
                    new NodeDto { Id = "resistor2", Label = "Resistor 2", Type = "Resistor", X = 250, Y = 50, Properties = { { "Resistance", "200" } } }
                },
                Wires = new List<WireDto>
                {
                    new WireDto { Id = "w1", FromNodeId = "battery", FromPort = "+", ToNodeId = "resistor1", ToPort = "a" },
                    new WireDto { Id = "w2", FromNodeId = "resistor1", FromPort = "b", ToNodeId = "resistor2", ToPort = "a" },
                    new WireDto { Id = "w3", FromNodeId = "resistor2", FromPort = "b", ToNodeId = "battery", ToPort = "-" }
                }
            }
        };

        public List<CircuitLabDto> GetAllCircuitLabs() => _labs;
        public CircuitLabDto? GetCircuitLab(int id) => _labs.Find(e => e.Id == id);
    }
}
