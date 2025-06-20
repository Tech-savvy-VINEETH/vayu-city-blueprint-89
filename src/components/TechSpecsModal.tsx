
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ExternalLink, Wrench } from 'lucide-react';

const TechSpecsModal = () => {
  const techSpecs = [
    {
      component: "Air Filtration",
      specification: "Dual-stage HEPA + Activated Carbon Filters"
    },
    {
      component: "Sensor Array", 
      specification: "PM1, PM2.5, PM10, CO, NO₂, SO₂, O₃, Temperature, Humidity"
    },
    {
      component: "Connectivity",
      specification: "5G-enabled, LoRa fallback, real-time cloud synchronization"
    },
    {
      component: "Power Source",
      specification: "Solar-powered with 48-hour Li-ion battery backup"
    },
    {
      component: "Processing Unit",
      specification: "Onboard Edge AI chip running AeroBrain Lite models"
    },
    {
      component: "Enclosure",
      specification: "Modular IP67-rated weatherproof, vandal-resistant shell"
    },
    {
      component: "Public Display",
      specification: "Optional digital LED for real-time AQI display"
    },
    {
      component: "Mounting Options",
      specification: "Pole-mounted, wall-mounted, or base-pod with anchoring system"
    },
    {
      component: "Maintenance",
      specification: "Quick-swap filter cartridges, self-diagnosing sensors"
    },
    {
      component: "Coverage Radius",
      specification: "50-75 meters effective air purification range"
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-vayu-mint hover:bg-vayu-mint-dark text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:scale-105 transition-all duration-200">
          <ExternalLink className="h-5 w-5" />
          View Tech Specs
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-vayu-dark border-white/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-white mb-4">
            <Wrench className="h-6 w-6 text-vayu-mint" />
            VayuPod Gen-1 – Technical Specifications
          </DialogTitle>
        </DialogHeader>
        
        <Card className="bg-white/5 border-white/20 backdrop-blur-md">
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20">
                  <TableHead className="text-vayu-mint font-semibold text-lg w-1/3">Component</TableHead>
                  <TableHead className="text-vayu-mint font-semibold text-lg">Specification</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {techSpecs.map((spec, index) => (
                  <TableRow key={index} className="border-white/10 hover:bg-white/5">
                    <TableCell className="text-white font-medium py-4">
                      {spec.component}
                    </TableCell>
                    <TableCell className="text-gray-300 py-4">
                      {spec.specification}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-6 p-4 bg-vayu-mint/10 rounded-lg border border-vayu-mint/20">
              <p className="text-sm text-gray-300">
                <strong className="text-vayu-mint">Note:</strong> Specifications may vary based on deployment environment and configuration requirements. 
                All VayuPod units undergo rigorous testing for optimal performance in Indian climate conditions.
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default TechSpecsModal;
