import { useState } from 'react';
import { categories } from '@/lib/dummy-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export function RegisterPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Registration submitted! We will review and approve your business shortly.');
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-10 pb-20 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Progress Header */}
        <div className="text-center mb-10">
          <Badge className="mb-4 bg-primary/10 text-primary border-none font-bold">Step {step} of 3</Badge>
          <h1 className="text-3xl font-black text-secondary tracking-tight">Register Your Business</h1>
          <p className="text-muted-foreground text-sm mt-2">Join Kasaragod's fastest growing business community</p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2, 3].map((s) => (
            <div 
              key={s}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                step === s ? "w-12 bg-primary" : step > s ? "w-6 bg-secondary" : "w-6 bg-gray-200"
              )}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card className="p-8 rounded-3xl border-gray-100 shadow-xl shadow-black/5">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-50 mb-4">
                       <Building2 className="text-primary size-5" />
                       <h2 className="text-lg font-bold text-secondary">Basic Information</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Business Name</Label>
                        <Input required placeholder="e.g. Kasaragod Tech Solutions" className="h-12 rounded-xl border-gray-100 bg-gray-50 focus-visible:bg-white transition-colors" />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Category</Label>
                        <Select required>
                          <SelectTrigger className="h-12 rounded-xl border-gray-100 bg-gray-50 focus-visible:bg-white transition-colors">
                            <SelectValue placeholder="Select business category" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-gray-100">
                            {categories.map(cat => (
                              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Business Description</Label>
                        <Textarea 
                          required 
                          placeholder="Tell us about your services, products, and specialties..." 
                          className="min-h-[120px] rounded-xl border-gray-100 bg-gray-50 focus-visible:bg-white transition-colors resize-none" 
                        />
                      </div>
                    </div>
                  </div>
                </Card>
                <div className="flex justify-end">
                  <Button type="button" onClick={nextStep} className="h-12 px-8 rounded-xl font-bold bg-secondary text-white shadow-xl">
                    Next Step <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card className="p-8 rounded-3xl border-gray-100 shadow-xl shadow-black/5">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-50 mb-4">
                       <Phone className="text-primary size-5" />
                       <h2 className="text-lg font-bold text-secondary">Contact & Location</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                        <Input required placeholder="+91 00000 00000" className="h-12 rounded-xl border-gray-100 bg-gray-50 focus-visible:bg-white transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">WhatsApp Number</Label>
                        <Input placeholder="Optional - for direct leads" className="h-12 rounded-xl border-gray-100 bg-gray-50 focus-visible:bg-white transition-colors" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">E-mail Address</Label>
                        <Input type="email" placeholder="business@example.com" className="h-12 rounded-xl border-gray-100 bg-gray-50 focus-visible:bg-white transition-colors" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Address</Label>
                        <Input required placeholder="Building No, Street, Landmark, Town" className="h-12 rounded-xl border-gray-100 bg-gray-50 focus-visible:bg-white transition-colors" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                         <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Major Location / Town</Label>
                         <Input required placeholder="e.g. Kasaragod Town, Bekal, Uppala" className="h-12 rounded-xl border-gray-100 bg-gray-50 focus-visible:bg-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </Card>
                <div className="flex justify-between">
                  <Button type="button" variant="ghost" onClick={prevStep} className="h-12 px-6 rounded-xl font-bold">
                    <ArrowLeft className="mr-2 size-4" /> Back
                  </Button>
                  <Button type="button" onClick={nextStep} className="h-12 px-8 rounded-xl font-bold bg-secondary text-white shadow-xl">
                    Last Step <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card className="p-8 rounded-3xl border-gray-100 shadow-xl shadow-black/5">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-50 mb-4">
                       <Upload className="text-primary size-5" />
                       <h2 className="text-lg font-bold text-secondary">Logo & Photos</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                      <div className="space-y-4">
                        <Label className="text-xs font-bold text-secondary">Business Logo</Label>
                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center bg-gray-50 hover:bg-white hover:border-primary/50 transition-all cursor-pointer group">
                           <Upload className="size-8 text-gray-300 mx-auto mb-3 group-hover:text-primary transition-colors" />
                           <p className="text-xs font-bold text-secondary">Click to upload brand logo</p>
                           <p className="text-[10px] text-muted-foreground mt-1">Recommended: Square format, PNG/JPG</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-xs font-bold text-secondary">Gallery Photos (Max 5)</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                           {[1, 2, 3, 4].map(i => (
                             <div key={i} className="aspect-square rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-300">
                               <Plus className="size-6" />
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex gap-4">
                   <Info className="size-5 text-blue-500 shrink-0" />
                   <p className="text-xs text-blue-800 leading-relaxed">
                     Your business will go live after a short verification process by our team. You'll receive a confirmation email once approved.
                   </p>
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="ghost" onClick={prevStep} className="h-12 px-6 rounded-xl font-bold">
                    <ArrowLeft className="mr-2 size-4" /> Back
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="h-12 px-10 rounded-xl font-bold bg-primary text-white shadow-xl shadow-primary/20 hover:bg-orange-600">
                    {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
