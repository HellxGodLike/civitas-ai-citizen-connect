import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from '@/components/ui/glass-card';
import { Label } from '@/components/ui/label';
import { MapPin, Camera, Mic, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReportIssueForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    issueType: '',
    description: '',
    location: '',
    timeObserved: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const issueTypes = [
    { value: 'pothole', label: 'Pothole' },
    { value: 'garbage', label: 'Garbage Collection' },
    { value: 'streetlight', label: 'Streetlight' },
    { value: 'traffic', label: 'Traffic Signal' },
    { value: 'water', label: 'Water/Sewage' },
    { value: 'other', label: 'Other' }
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    toast({
      title: "Report Submitted Successfully!",
      description: "Your civic issue has been reported. Thank you for helping improve your community.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <GlassCard>
          <GlassCardContent className="text-center py-12">
            <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Report Submitted Successfully!</h3>
            <p className="text-muted-foreground mb-6">
              Your report has been received and assigned ID #CR-{Math.floor(Math.random() * 10000)}. 
              You'll receive updates on the progress via email.
            </p>
            <Button onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
              setFormData({ issueType: '', description: '', location: '', timeObserved: '' });
            }}>
              Report Another Issue
            </Button>
          </GlassCardContent>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <GlassCard>
        <GlassCardHeader>
          <GlassCardTitle className="text-2xl text-center">
            🤖 AI Issue Reporter - Step {currentStep} of 5
          </GlassCardTitle>
          <div className="w-full bg-muted rounded-full h-2 mt-4">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </GlassCardHeader>
        <GlassCardContent className="space-y-6">
          
          {currentStep === 1 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold">What type of issue are you reporting?</Label>
              <Select value={formData.issueType} onValueChange={(value) => 
                setFormData({...formData, issueType: value})
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  {issueTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Describe the issue in detail</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Please provide a detailed description of the issue..."
                className="min-h-32"
              />
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Mic className="w-4 h-4 mr-2" />
                  Voice Input
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Where is this issue located?</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Enter street address or description"
              />
              <Button variant="outline" size="sm">
                <MapPin className="w-4 h-4 mr-2" />
                Use Current Location
              </Button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold">When did you observe this issue?</Label>
              <Input
                type="datetime-local"
                value={formData.timeObserved}
                onChange={(e) => setFormData({...formData, timeObserved: e.target.value})}
              />
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Upload photos or videos (optional)</Label>
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
                <Camera className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Click to upload photos or videos of the issue
                </p>
                <Button variant="outline">
                  Choose Files
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < 5 ? (
              <Button 
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !formData.issueType) ||
                  (currentStep === 2 && !formData.description) ||
                  (currentStep === 3 && !formData.location)
                }
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                <Send className="w-4 h-4 mr-2" />
                Submit Report
              </Button>
            )}
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
};

export default ReportIssueForm;