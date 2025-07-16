import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Heart, Brain, Activity, Stethoscope, CheckCircle, AlertCircle } from 'lucide-react';

interface SymptomData {
  symptoms: string;
  duration: string;
  severity: string;
  age: string;
  additionalInfo: string;
}

interface DiagnosticResult {
  condition: string;
  probability: number;
  severity: 'low' | 'moderate' | 'high';
  recommendations: string[];
}

const DiagnosticAssistant = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [symptomData, setSymptomData] = useState<SymptomData>({
    symptoms: '',
    duration: '',
    severity: '',
    age: '',
    additionalInfo: ''
  });
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (field: keyof SymptomData, value: string) => {
    setSymptomData(prev => ({ ...prev, [field]: value }));
  };

  const simulateAIAnalysis = () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockResults: DiagnosticResult[] = [
        {
          condition: "Common Cold",
          probability: 75,
          severity: 'low',
          recommendations: [
            "Rest and stay hydrated",
            "Over-the-counter pain relievers if needed",
            "Monitor symptoms for 7-10 days"
          ]
        },
        {
          condition: "Seasonal Allergies",
          probability: 60,
          severity: 'low',
          recommendations: [
            "Consider antihistamines",
            "Avoid known allergens",
            "Consult allergist if symptoms persist"
          ]
        },
        {
          condition: "Viral Upper Respiratory Infection",
          probability: 45,
          severity: 'moderate',
          recommendations: [
            "Rest and increase fluid intake",
            "Humidify your environment",
            "Seek medical care if symptoms worsen"
          ]
        }
      ];
      
      setResults(mockResults);
      setIsAnalyzing(false);
      setCurrentStep(3);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'medical-success';
      case 'moderate': return 'medical-warning';
      case 'high': return 'medical-danger';
      default: return 'primary';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="w-4 h-4" />;
      case 'moderate': return <AlertCircle className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-subtle)] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[var(--gradient-primary)] shadow-[var(--shadow-medical)]">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">HealthAI Assistant</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced AI-powered preliminary health assessment. Get instant insights about your symptoms.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-[var(--transition-smooth)] ${
                  currentStep >= step 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {step === 1 && <Heart className="w-4 h-4" />}
                {step === 2 && <Brain className="w-4 h-4" />}
                {step === 3 && <Activity className="w-4 h-4" />}
                <span className="font-medium">
                  {step === 1 ? 'Symptoms' : step === 2 ? 'Analysis' : 'Results'}
                </span>
              </div>
            ))}
          </div>
          <Progress value={(currentStep / 3) * 100} className="w-full max-w-md mx-auto" />
        </div>

        {/* Step 1: Symptom Input */}
        {currentStep === 1 && (
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Tell us about your symptoms
              </CardTitle>
              <CardDescription>
                Please provide detailed information about what you're experiencing. The more specific you are, the better our AI can assist you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="symptoms">Main symptoms *</Label>
                <Textarea
                  id="symptoms"
                  placeholder="Describe your symptoms in detail (e.g., headache, fever, cough, fatigue...)"
                  value={symptomData.symptoms}
                  onChange={(e) => handleInputChange('symptoms', e.target.value)}
                  className="min-h-24"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 3 days"
                    value={symptomData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="severity">Severity (1-10)</Label>
                  <Input
                    id="severity"
                    type="number"
                    min="1"
                    max="10"
                    placeholder="1-10"
                    value={symptomData.severity}
                    onChange={(e) => handleInputChange('severity', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Your age"
                    value={symptomData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional">Additional information</Label>
                <Textarea
                  id="additional"
                  placeholder="Any additional context, medical history, or concerns..."
                  value={symptomData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  variant="medical"
                  onClick={() => setCurrentStep(2)}
                  disabled={!symptomData.symptoms.trim()}
                  className="px-8"
                >
                  Analyze Symptoms
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Analysis Loading */}
        {currentStep === 2 && (
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI Analysis in Progress
              </CardTitle>
              <CardDescription>
                Our advanced AI is analyzing your symptoms and comparing them with medical databases...
              </CardDescription>
            </CardHeader>
            <CardContent className="py-12">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-[var(--gradient-primary)] flex items-center justify-center animate-pulse">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium">Analyzing symptoms...</p>
                  <Progress value={isAnalyzing ? undefined : 100} className="w-full max-w-sm mx-auto" />
                </div>
                <div className="max-w-md mx-auto text-center">
                  <Button 
                    variant="medical"
                    onClick={simulateAIAnalysis}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? 'Processing...' : 'Start Analysis'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Results */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card className="shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Preliminary Assessment Results
                </CardTitle>
                <CardDescription>
                  Based on your symptoms, here are potential conditions ranked by likelihood. This is not a diagnosis.
                </CardDescription>
              </CardHeader>
            </Card>

            {results.map((result, index) => (
              <Card key={index} className="shadow-[var(--shadow-card)]">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-${getSeverityColor(result.severity)}/10`}>
                        {getSeverityIcon(result.severity)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{result.condition}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={result.severity === 'low' ? 'secondary' : 'outline'}>
                            {result.severity} priority
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {result.probability}% match
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{result.probability}%</div>
                      <Progress value={result.probability} className="w-24 mt-1" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Recommendations:</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, recIndex) => (
                        <li key={recIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-medical-success mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Important Disclaimer */}
            <Card className="border-medical-warning/50 bg-medical-warning/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-medical-warning flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Important Medical Disclaimer</h4>
                    <p className="text-sm text-muted-foreground">
                      This AI assessment is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                    </p>
                    <div className="flex gap-3 pt-2">
                      <Button variant="medical" size="sm">
                        Find a Doctor
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => {
                        setCurrentStep(1);
                        setResults([]);
                        setSymptomData({
                          symptoms: '',
                          duration: '',
                          severity: '',
                          age: '',
                          additionalInfo: ''
                        });
                      }}>
                        New Assessment
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosticAssistant;