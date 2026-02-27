import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TravelPackage } from '../backend';
import { MapPin, DollarSign, Info } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PackageDetailsDialogProps {
  package: TravelPackage;
  children?: React.ReactNode;
}

export default function PackageDetailsDialog({ package: pkg, children }: PackageDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || <Button>View Details</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            {pkg.title}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-lg font-semibold text-primary">
            <DollarSign className="h-5 w-5" />
            ${pkg.price.toString()}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Package Image */}
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <img
                src={pkg.image.getDirectURL()}
                alt={pkg.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Package Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                <Info className="h-4 w-4" />
                Package Details
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="text-base leading-relaxed whitespace-pre-wrap text-foreground">
                  {pkg.details}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                For booking inquiries and more information, please contact us or use the enquiry form.
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
