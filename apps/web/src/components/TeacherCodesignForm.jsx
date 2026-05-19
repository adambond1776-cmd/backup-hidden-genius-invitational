
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import pb from '@/lib/pocketbaseClient';

const TeacherCodesignForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, watch } = useForm({
    defaultValues: {
      summerAvailable: false
    }
  });

  const summerAvailable = watch('summerAvailable');

  const onSubmit = async (data) => {
    setSubmitError('');
    try {
      await pb.collection('teacher_codesign_applications').create(data);
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
        <h3 className="text-2xl font-bold text-foreground mb-2">Application Received!</h3>
        <p className="text-muted-foreground">Thank you for volunteering to co-design with us. We'll be in touch.</p>
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
              placeholder="John Smith"
              {...register('fullName', { required: 'Full name is required' })} 
            />
            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">School Email Address *</Label>
            <Input 
              id="email" 
              type="email"
              className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              placeholder="jsmith@school.edu"
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
            <Label htmlFor="schoolDistrict">School / District *</Label>
            <Input 
              id="schoolDistrict" 
              className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              placeholder="Lincoln High School"
              {...register('schoolDistrict', { required: 'School/District is required' })} 
            />
            {errors.schoolDistrict && <p className="text-sm text-destructive">{errors.schoolDistrict.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="gradeLevels">Grade Levels Taught *</Label>
            <Input 
              id="gradeLevels" 
              className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              placeholder="9th - 12th"
              {...register('gradeLevels', { required: 'Grade levels are required' })} 
            />
            {errors.gradeLevels && <p className="text-sm text-destructive">{errors.gradeLevels.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="subjects">Subjects Taught *</Label>
            <Input 
              id="subjects" 
              className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              placeholder="History, Social Studies"
              {...register('subjects', { required: 'Subjects are required' })} 
            />
            {errors.subjects && <p className="text-sm text-destructive">{errors.subjects.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="yearsExperience">Years of Experience *</Label>
            <Input 
              id="yearsExperience" 
              type="number"
              className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              placeholder="5"
              {...register('yearsExperience', { required: 'Years of experience is required' })} 
            />
            {errors.yearsExperience && <p className="text-sm text-destructive">{errors.yearsExperience.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="codesignReason">Why do you want to co-design the Family Edition? *</Label>
          <Textarea 
            id="codesignReason" 
            className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary min-h-[100px]"
            placeholder="I see the gaps in..."
            {...register('codesignReason', { required: 'Please tell us why you want to join' })} 
          />
          {errors.codesignReason && <p className="text-sm text-destructive">{errors.codesignReason.message}</p>}
        </div>

        <div className="flex items-start space-x-3 pt-2">
          <Checkbox 
            id="summerAvailable" 
            checked={summerAvailable}
            onCheckedChange={(checked) => setValue('summerAvailable', checked)}
            className="mt-1 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          />
          <div className="space-y-1 leading-none">
            <Label htmlFor="summerAvailable" className="text-sm font-medium text-foreground">
              I am available for 1-2 days per week during the 4-week summer sprint *
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
        disabled={isSubmitting || !summerAvailable} 
        className="w-full h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Apply as Design Partner'
        )}
      </Button>
    </form>
  );
};

export default TeacherCodesignForm;
