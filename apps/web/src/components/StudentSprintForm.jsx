
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import pb from '@/lib/pocketbaseClient';

const StudentSprintForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, watch } = useForm({
    defaultValues: {
      documentaryConsent: false
    }
  });

  const documentaryConsent = watch('documentaryConsent');

  const onSubmit = async (data) => {
    setSubmitError('');
    try {
      const response = await fetch('https://formsubmit.co/ajax/90sprint@hiddengeniusinvitational.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: '90-Day Level-Up Sprint Application',
          _template: 'table',
          fullName: data.fullName,
          email: data.email,
          phone: data.phone || '',
          ageGrade: data.ageGrade,
          schoolSituation: data.schoolSituation,
          videoLink: data.videoLink,
          pitchReason: data.pitchReason,
          documentaryConsent: data.documentaryConsent ? 'Yes' : 'No',
        }),
      });

      if (!response.ok) {
        throw new Error('Email submission failed');
      }

      // Best-effort PocketBase backup when the backend is available
      try {
        await pb.collection('student_sprint_pitches').create(data);
      } catch (pocketbaseError) {
        console.warn('PocketBase backup skipped:', pocketbaseError);
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        reset();
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to submit application. Please try again.');
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-card border border-primary/30 rounded-2xl p-8 text-center form-success-enter">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Pitch Submitted!</h3>
        <p className="text-muted-foreground">We'll review your video and get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card border border-border p-6 md:p-8 rounded-2xl">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input 
              id="fullName" 
              className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              placeholder="Jane Doe"
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
              placeholder="jane@example.com"
              {...register('email', { 
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
              })} 
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel"
              className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              placeholder="(555) 123-4567"
              {...register('phone')} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ageGrade">Age / Grade Level *</Label>
            <Input 
              id="ageGrade" 
              className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              placeholder="16 / 11th Grade"
              {...register('ageGrade', { required: 'Age/Grade is required' })} 
            />
            {errors.ageGrade && <p className="text-sm text-destructive">{errors.ageGrade.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="schoolSituation">Current School Situation *</Label>
          <Input 
            id="schoolSituation" 
            className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            placeholder="Public high school, feeling burnt out..."
            {...register('schoolSituation', { required: 'Please describe your situation' })} 
          />
          {errors.schoolSituation && <p className="text-sm text-destructive">{errors.schoolSituation.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="videoLink">60-Second Video Pitch Link (YouTube/Loom/Drive) *</Label>
          <Input 
            id="videoLink" 
            type="url"
            className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            placeholder="https://..."
            {...register('videoLink', { required: 'Video link is required' })} 
          />
          {errors.videoLink && <p className="text-sm text-destructive">{errors.videoLink.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pitchReason">Why do you want to join the sprint? *</Label>
          <Textarea 
            id="pitchReason" 
            className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary min-h-[100px]"
            placeholder="I want to level up because..."
            {...register('pitchReason', { required: 'Please tell us why you want to join' })} 
          />
          {errors.pitchReason && <p className="text-sm text-destructive">{errors.pitchReason.message}</p>}
        </div>

        <div className="flex items-start space-x-3 pt-2">
          <Checkbox 
            id="documentaryConsent" 
            checked={documentaryConsent}
            onCheckedChange={(checked) => setValue('documentaryConsent', checked)}
            className="mt-1 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          />
          <div className="space-y-1 leading-none">
            <Label htmlFor="documentaryConsent" className="text-sm font-medium text-foreground">
              I consent to being featured in the documentary *
            </Label>
            <p className="text-sm text-muted-foreground">
              You must agree to be filmed and documented throughout the 90-day sprint.
            </p>
          </div>
        </div>
        {errors.documentaryConsent && <p className="text-sm text-destructive">Consent is required</p>}
      </div>

      {submitError && (
        <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="w-4 h-4" />
          {submitError}
        </div>
      )}

      <Button 
        type="submit" 
        disabled={isSubmitting || !documentaryConsent} 
        className="w-full h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Application'
        )}
      </Button>
    </form>
  );
};

export default StudentSprintForm;
