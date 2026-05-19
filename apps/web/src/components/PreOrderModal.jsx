
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle2, AlertCircle, QrCode } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import pb from '@/lib/pocketbaseClient';

const SOFTCOVER_PRICE = 14.99;
const formatPrice = (amount) => amount.toFixed(2);

const PreOrderModal = ({ isOpen, onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, watch } = useForm({
    defaultValues: {
      quantity: "1"
    }
  });

  const quantity = watch('quantity');

  const onSubmit = async (data) => {
    setSubmitError('');
    try {
      await pb.collection('preorders').create({
        email: data.email,
        quantity: parseInt(data.quantity, 10),
        message: data.message || '',
        paymentStatus: 'Pending'
      }, { $autoCancel: false });
      
      setIsSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to submit pre-order. Please try again.');
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after animation completes
    setTimeout(() => {
      setIsSuccess(false);
      reset();
      setSubmitError('');
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md bg-card border-border text-foreground">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground">Pre-Order The Manual</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Secure your copy before the official launch. ${formatPrice(SOFTCOVER_PRICE)} per copy.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email" 
                    type="email"
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                    placeholder="you@example.com"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                    })} 
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Select 
                    value={quantity} 
                    onValueChange={(val) => setValue('quantity', val)}
                  >
                    <SelectTrigger className="bg-input border-border text-foreground focus:ring-primary">
                      <SelectValue placeholder="Select quantity" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border text-popover-foreground">
                      <SelectItem value="1">1 Copy (${formatPrice(SOFTCOVER_PRICE)})</SelectItem>
                      <SelectItem value="2">2 Copies (${formatPrice(SOFTCOVER_PRICE * 2)})</SelectItem>
                      <SelectItem value="3">3 Copies (${formatPrice(SOFTCOVER_PRICE * 3)})</SelectItem>
                      <SelectItem value="5">5 Copies (${formatPrice(SOFTCOVER_PRICE * 5)})</SelectItem>
                      <SelectItem value="10">10+ Copies (Contact for bulk pricing)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea 
                    id="message" 
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary min-h-[80px]"
                    placeholder="Any special requests or notes?"
                    {...register('message')} 
                  />
                </div>
              </div>

              {submitError && (
                <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {submitError}
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Complete Pre-Order'
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="py-6 text-center space-y-6">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Thank you for pre-ordering!</h3>
              <p className="text-muted-foreground">Your order has been recorded.</p>
            </div>

            <div className="bg-muted/50 rounded-xl p-6 border border-border space-y-4">
              <div className="flex items-center justify-center gap-2 text-primary font-bold text-lg">
                <QrCode className="w-5 h-5" />
                Venmo: @AdamBond1776
              </div>
              
              <img 
                src="https://images.unsplash.com/photo-1626682561113-d1db402cc866" 
                alt="Venmo QR Code" 
                className="w-48 h-48 mx-auto rounded-lg shadow-md object-cover"
              />
              
              <div className="text-sm text-foreground/80 space-y-2">
                <p><strong>Total Due:</strong> ${formatPrice(parseInt(quantity, 10) * SOFTCOVER_PRICE)}</p>
                <p>Send payment via Venmo to <strong>@AdamBond1776</strong> with your email in the note.</p>
                <p className="text-muted-foreground">You'll receive your ebook upon payment confirmation.</p>
              </div>
            </div>

            <Button 
              onClick={handleClose} 
              className="w-full h-12 text-base font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PreOrderModal;
