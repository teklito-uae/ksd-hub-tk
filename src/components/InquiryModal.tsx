import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Send, Phone, User, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
}

export function InquiryModal({ isOpen, onClose, businessName }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success('Inquiry sent successfully!');
    }, 1500);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
        {!isSuccess ? (
          <form onSubmit={handleSubmit}>
            <DialogHeader className="p-6 bg-secondary text-white">
              <DialogTitle className="text-xl font-bold">Send Inquiry</DialogTitle>
              <DialogDescription className="text-white/60 text-xs">
                Inquire about services from <span className="text-primary font-bold">{businessName}</span>
              </DialogDescription>
            </DialogHeader>
            
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Your Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input id="name" required placeholder="Enter your full name" className="pl-10 h-11 rounded-xl border-gray-100 bg-gray-50 focus-visible:bg-white transition-colors" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input id="phone" required type="tel" placeholder="+91 00000 00000" className="pl-10 h-11 rounded-xl border-gray-100 bg-gray-50 focus-visible:bg-white transition-colors" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Inquiry Details</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 size-4 text-gray-400" />
                  <Textarea 
                    id="message" 
                    required 
                    placeholder="Tell them what you are looking for..." 
                    className="pl-10 min-h-[100px] rounded-xl border-gray-100 bg-gray-50 focus-visible:bg-white transition-colors resize-none" 
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter className="p-6 bg-gray-50 flex-col sm:flex-row gap-3">
              <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl h-11 text-xs font-bold">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="rounded-xl h-11 px-8 bg-primary text-white hover:bg-orange-600 font-bold shadow-lg shadow-primary/20 flex-1 sm:flex-none">
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                {!isSubmitting && <Send className="ml-2 size-3.5" />}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="p-10 text-center space-y-6">
            <div className="size-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
               <CheckCircle2 className="size-10" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-secondary">Inquiry Sent!</h3>
              <p className="text-sm text-muted-foreground mt-2 px-4 leading-relaxed">
                Your message has been sent to <strong>{businessName}</strong>. They will contact you shortly on the provided number.
              </p>
            </div>
            <Button onClick={resetAndClose} className="w-full h-12 bg-secondary text-white rounded-xl font-bold">
              Close Window
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
