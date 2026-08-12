import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import pb from '@/lib/pocketbaseClient';

const STUDENT_ROLES = [
  { value: 'Student', label: 'Student' },
  { value: 'Parent/Guardian', label: 'Parent/Guardian' },
];

const PARTNER_ROLES = [
  { value: 'Educator/Faculty', label: 'Educator/Faculty' },
  { value: 'University or School Representative', label: 'University or School Representative' },
  { value: 'Employer/Mentor', label: 'Employer/Mentor' },
  { value: 'Community/Donor Partner', label: 'Community/Donor Partner' },
  { value: 'Media/Press', label: 'Media/Press' },
  { value: 'Other', label: 'Other' },
];

const LevelUpRIForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [activeTrack, setActiveTrack] = useState('students_families');

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, watch } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      role: '',
      organization: '',
      cityTown: '',
      interest: '',
      notes: '',
      keepUpdated: false,
    }
  });

  const role = watch('role');
  const keepUpdated = watch('keepUpdated');
  const roleOptions = activeTrack === 'students_families' ? STUDENT_ROLES : PARTNER_ROLES;
  const organizationLabel = activeTrack === 'students_families'
    ? 'School / Grade Level'
    : 'Organization / Institution';

  const handleTrackChange = (value) => {
    setActiveTrack(value);
    setValue('role', '');
  };

  const onSubmit = async (data) => {
    setSubmitError('');
    try {
      const payload = {
        _subject: 'New Level Up RI Signup',
        _template: 'table',
        track: activeTrack,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || '',
        role: data.role,
        organization: data.organization || '',
        cityTown: data.cityTown || '',
        interest: data.interest || '',
        notes: data.notes || '',
        keepUpdated: data.keepUpdated ? 'Yes' : 'No',
      };

      const response = await fetch('https://formsubmit.co/ajax/levelupri@hiddengeniusinvitational.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Email submission failed');
      }

      try {
        await pb.collection('level_up_ri_signups').create({
          full_name: data.fullName,
          email: data.email,
          phone: data.phone || '',
          track: activeTrack,
          role: data.role,
          organization: data.organization || '',
          city_town: data.cityTown || '',
          interest: data.interest || '',
          notes: data.notes || '',
          keep_updated: Boolean(data.keepUpdated),
        });
      } catch (pocketbaseError) {
        console.warn('PocketBase backup skipped:', pocketbaseError);
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        reset();
        setActiveTrack('students_families');
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to submit. Please try again.');
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-card border border-primary/30 rounded-2xl p-8 text-center form-success-enter">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">You're on the list.</h3>
        <p className="text-muted-foreground">We'll follow up as the Rhode Island build takes shape.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card border border-border p-6 md:p-8 rounded-2xl">
      <Tabs value={activeTrack} onValueChange={handleTrackChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-muted">
          <TabsTrigger
            value="students_families"
            className="text-xs sm:text-sm font-bold uppercase tracking-wide py-2.5 data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            Students & Families
          </TabsTrigger>
          <TabsTrigger
            value="partners_institutions"
            className="text-xs sm:text-sm font-bold uppercase tracking-wide py-2.5 data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            Partners & Institutions
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTrack} className="mt-6 space-y-4 outline-none">
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
              <Label htmlFor="role">Role *</Label>
              <Select
                value={role}
                onValueChange={(val) => setValue('role', val, { shouldValidate: true })}
              >
                <SelectTrigger className="bg-input border-border text-foreground focus:ring-primary">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border text-popover-foreground">
                  {roleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register('role', { required: 'Role is required' })}
              />
              {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organization">{organizationLabel}</Label>
              <Input
                id="organization"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                placeholder={activeTrack === 'students_families' ? 'Lincoln High / 11th Grade' : 'Organization name'}
                {...register('organization')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cityTown">Rhode Island City/Town</Label>
              <Input
                id="cityTown"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                placeholder="Providence"
                {...register('cityTown')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interest">What are you most interested in?</Label>
            <Input
              id="interest"
              className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              placeholder="Internships, mentoring, partnerships..."
              {...register('interest')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Anything else you'd like us to know?</Label>
            <Textarea
              id="notes"
              className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary min-h-[100px]"
              placeholder="Share context, connections, or questions..."
              {...register('notes')}
            />
          </div>

          <div className="flex items-start space-x-3 pt-2">
            <Checkbox
              id="keepUpdated"
              checked={keepUpdated}
              onCheckedChange={(checked) => setValue('keepUpdated', checked)}
              className="mt-1 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            />
            <div className="space-y-1 leading-none">
              <Label htmlFor="keepUpdated" className="text-sm font-medium text-foreground">
                Keep me updated on the Rhode Island build
              </Label>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {submitError && (
        <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="w-4 h-4" />
          {submitError}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Join the Rhode Island List'
        )}
      </Button>
    </form>
  );
};

export default LevelUpRIForm;
