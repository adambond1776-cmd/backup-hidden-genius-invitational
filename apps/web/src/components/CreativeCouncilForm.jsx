
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import pb from '@/lib/pocketbaseClient';

const CreativeCouncilForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, watch } = useForm({
    defaultValues: {
      voteOnDirection: true,
      submitSuggestions: true,
      receiveUpdates: true
    }
  });

  const voteOnDirection = watch('voteOnDirection');
  const submitSuggestions = watch('submitSuggestions');
  const receiveUpdates = watch('receiveUpdates');

  const onSubmit = async (data) => {
    setSubmitError('');
    try {
      await pb.collection('creative_council_signups').create(data);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        reset();
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to join council. Please try again.');
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-card border border-primary/30 rounded-2xl p-8 text-center form-success-enter">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Welcome to the Council!</h3>
        <p className="text-muted-foreground">You're now part of the movement. Watch your inbox for the first vote.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card border border-border p-6 md:p-8 rounded-2xl">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input 
            id="fullName" 
            className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            placeholder="Alex Johnson"
            {...register('fullName', { required: 'Full name is required' })} 
          />
          {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input 
            id="email" 
            type="email"
            className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            placeholder="alex@example.com"
            {...register('email', { 
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
            })} 
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="interestArea">Primary Area of Interest</Label>
          <Input 
            id="interestArea" 
            className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            placeholder="e.g., Mental Health, Productivity, Finance"
            {...register('interestArea')} 
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-border">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">How do you want to participate?</h4>
          
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="voteOnDirection" 
              checked={voteOnDirection}
              onCheckedChange={(checked) => setValue('voteOnDirection', checked)}
              className="mt-1 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            />
            <Label htmlFor="voteOnDirection" className="text-sm font-medium text-foreground leading-snug cursor-pointer">
              Vote on documentary direction and student stories
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="submitSuggestions" 
              checked={submitSuggestions}
              onCheckedChange={(checked) => setValue('submitSuggestions', checked)}
              className="mt-1 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            />
            <Label htmlFor="submitSuggestions" className="text-sm font-medium text-foreground leading-snug cursor-pointer">
              Submit suggestions for new tools and content
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="receiveUpdates" 
              checked={receiveUpdates}
              onCheckedChange={(checked) => setValue('receiveUpdates', checked)}
              className="mt-1 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            />
            <Label htmlFor="receiveUpdates" className="text-sm font-medium text-foreground leading-snug cursor-pointer">
              Receive behind-the-scenes updates
            </Label>
          </div>
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
            Joining...
          </>
        ) : (
          'Join the Creative Council'
        )}
      </Button>
    </form>
  );
};

export default CreativeCouncilForm;
