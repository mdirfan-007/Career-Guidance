import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Check, ChevronLeft, ChevronRight, Loader } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  status: string;
  statusOther: string;
  field: string;
  location: string;
  careerConfusion: string;
  guidanceSources: string[];
  guidanceSourceOther: string;
  fieldDiscussion: string;
  appUsage: string;
  usefulFeatures: string[];
  preferredLanguage: string;
  preferredLanguageOther: string;
  appHelp: string;
  earlyAccess: string;
  suggestions: string;
};

export default function SurveyForm() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  
  const sections = [
    { id: 0, title: "Aapke Baare Mein", icon: "👤" },
    { id: 1, title: "Career Problems & Experience", icon: "🔍" },
    { id: 2, title: "Aapki App Expectations", icon: "📱" },
    { id: 3, title: "Final Thoughts", icon: "💭" },
  ];
  
  const watchStatus = watch("status");
  const watchGuidanceSources = watch("guidanceSources");
  const watchPreferredLanguage = watch("preferredLanguage");
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('https://formspree.io/f/mvgqoebp', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        console.log('Form submitted successfully');
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const calculateProgress = () => {
    return ((currentSection + 1) / sections.length) * 100;
  };

  if (isSubmitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-4 py-12">
        <div className="w-20 h-20 bg-gradient-to-r from-[#11cb5f] to-[#24803d] rounded-full flex items-center justify-center mb-8 glow animate-pulse">
          <Check className="text-white w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold mb-4 gradient-text">Thank You!</h2>
        <p className="text-white/80 mb-8 max-w-md">
          Aapke feedback ke liye dhanyavaad. Hum jald hi Effectsup launch kar rahe hain!
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="px-8 py-3 bg-gradient-to-r from-[#11cb5f] to-[#24803d] rounded-lg text-white font-medium hover:opacity-95 transition-all glow btn-glow"
        >
          Go Back
        </button>
      </div>
    );
  }
  
  if (submitError) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-4 py-12">
        <div className="w-20 h-20 bg-red-500/80 rounded-full flex items-center justify-center mb-8 animate-pulse">
          <span className="text-white text-3xl font-bold">!</span>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-red-400">Submission Error</h2>
        <p className="text-white/80 mb-8 max-w-md">
          {submitError}
        </p>
        <button 
          onClick={() => setSubmitError(null)}
          className="px-8 py-3 bg-gradient-to-r from-[#11cb5f] to-[#24803d] rounded-lg text-white font-medium hover:opacity-95 transition-all glow btn-glow"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Progress bar */}
      <div className="w-full bg-white/5 h-2 rounded-full mb-8 backdrop-blur-sm border border-white/5">
        <div 
          className="bg-gradient-to-r from-[#11cb5f] to-[#24803d] h-2 rounded-full transition-all duration-300 glow" 
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>
      
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#11cb5f]/10 border border-[#11cb5f]/20 mr-3">
              <span className="text-xl">{sections[currentSection].icon}</span>
            </div>
            <h2 className="text-2xl font-bold gradient-text">
              {sections[currentSection].title}
            </h2>
          </div>
          <div className="px-4 py-1 bg-white/5 border border-[#11cb5f]/20 rounded-full backdrop-blur-sm text-xs font-medium text-white/80">
            {currentSection + 1} of {sections.length}
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} action="https://formspree.io/f/mvgqoebp" method="POST">
        {currentSection === 0 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="form-group">
              <label className="block mb-3 font-medium text-white/90">Aapka naam (optional):</label>
              <input
                type="text"
                className="w-full px-5 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#11cb5f] text-white placeholder:text-white/50"
                placeholder="Enter your name"
                {...register("name")}
              />
            </div>
            
            <div className="form-group">
              <label className="block mb-3 font-medium text-white/90">Email address:</label>
              <input
                type="email"
                className="w-full px-5 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#11cb5f] text-white placeholder:text-white/50"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>
            
            <div className="form-group">
              <label className="block mb-3 font-medium text-white/90">Phone number:</label>
              <input
                type="tel"
                className="w-full px-5 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#11cb5f] text-white placeholder:text-white/50"
                placeholder="Enter your phone number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number"
                  }
                })}
              />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
            </div>
            
            <div className="form-group">
              <label className="block mb-2 font-medium">Aapka current status kya hai?</label>
              <div className="space-y-3">
                {["College Student", "Fresher", "Working Professional", "Preparing for Jobs", "Career Mentor / Expert", "Other"].map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      id={`status-${option}`}
                      value={option}
                      className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 bg-white/5 border-white/20"
                      {...register("status", { required: "Please select your status" })}
                    />
                    <label htmlFor={`status-${option}`} className="text-white/90">{option}</label>
                  </div>
                ))}
                {watchStatus === "Other" && (
                  <input
                    type="text"
                    className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Please specify"
                    {...register("statusOther")}
                  />
                )}
              </div>
              {errors.status && <p className="text-red-500 mt-1">{errors.status.message}</p>}
            </div>
            
            <div className="form-group">
              <label className="block mb-2 font-medium">Aap kis field ya course mein ho?</label>
              <input
                type="text"
                className="w-full px-5 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#11cb5f] text-white placeholder:text-white/50"
                placeholder="e.g., BCA, Law, BBA, Design, Marketing, etc."
                {...register("field", { required: "Please enter your field" })}
              />
              {errors.field && <p className="text-red-500 mt-1">{errors.field.message}</p>}
            </div>
            
            <div className="form-group">
              <label className="block mb-2 font-medium">Aap kis sheher ya state se ho?</label>
              <input
                type="text"
                className="w-full px-5 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder:text-white/50"
                placeholder="Enter your city or state"
                {...register("location", { required: "Please enter your location" })}
              />
              {errors.location && <p className="text-red-500 mt-1">{errors.location.message}</p>}
            </div>
          </div>
        )}
        
        {currentSection === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="form-group">
              <label className="block mb-2 font-medium">Aapko kabhi career confusion ya doubt hua hai?</label>
              <div className="space-y-2">
                {["Hamesha hota hai", "Kabhi-kabhi", "Nahi, sab clear hai"].map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      id={`careerConfusion-${option}`}
                      value={option}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                      {...register("careerConfusion", { required: "Please select an option" })}
                    />
                    <label htmlFor={`careerConfusion-${option}`}>{option}</label>
                  </div>
                ))}
              </div>
              {errors.careerConfusion && <p className="text-red-500 mt-1">{errors.careerConfusion.message}</p>}
            </div>
            
            <div className="form-group">
              <label className="block mb-2 font-medium">Jab help chahiye hoti hai, aap kahan se guidance lete ho?</label>
              <div className="space-y-2">
                {["YouTube", "Google", "Friends/Batchmates", "Teachers", "LinkedIn", "Instagram", "Kahin aur"].map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`guidanceSources-${option}`}
                      value={option}
                      className="mr-2 text-purple-600 focus:ring-purple-500 rounded"
                      {...register("guidanceSources")}
                    />
                    <label htmlFor={`guidanceSources-${option}`}>{option}</label>
                  </div>
                ))}
                {watchGuidanceSources?.includes("Kahin aur") && (
                  <input
                    type="text"
                    className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Please specify"
                    {...register("guidanceSourceOther")}
                  />
                )}
              </div>
            </div>
            
            <div className="form-group">
              <label className="block mb-2 font-medium">Kya aapko apne field ke logon se discussion ka moka milta hai?</label>
              <div className="space-y-2">
                {["Nahi", "Kabhi kabhi", "Haan, but not enough", "Haan, regularly"].map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      id={`fieldDiscussion-${option}`}
                      value={option}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                      {...register("fieldDiscussion", { required: "Please select an option" })}
                    />
                    <label htmlFor={`fieldDiscussion-${option}`}>{option}</label>
                  </div>
                ))}
              </div>
              {errors.fieldDiscussion && <p className="text-red-500 mt-1">{errors.fieldDiscussion.message}</p>}
            </div>
          </div>
        )}
        
        {currentSection === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="form-group">
              <label className="block mb-2 font-medium">Agar ek app ho jisme aap sirf apne career field ke logon se jud paayein, kya aap usse use karenge?</label>
              <div className="space-y-2">
                {["Bilkul", "Shayad", "Nahi"].map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      id={`appUsage-${option}`}
                      value={option}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                      {...register("appUsage", { required: "Please select an option" })}
                    />
                    <label htmlFor={`appUsage-${option}`}>{option}</label>
                  </div>
                ))}
              </div>
              {errors.appUsage && <p className="text-red-500 mt-1">{errors.appUsage.message}</p>}
            </div>
            
            <div className="form-group">
              <label className="block mb-2 font-medium">Effectsup me niche diye gaye features me se kaunse aapko useful lagte hain?</label>
              <div className="space-y-2">
                {[
                  "Field-Based Feed",
                  "Career Q&A Wall",
                  "Peer-to-Peer Chat Matching",
                  "Mentor-Mentee Connect",
                  "Live Audio Career Rooms",
                  "Problem Swapping (mutual help)",
                  "Learning Cards (1-minute tips)",
                  "Project Collaboration Tools",
                  "Skill Roadmaps (Skill DNA Scanner)",
                  "Regional Student Groups",
                  "Auto-Translation Content"
                ].map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`usefulFeatures-${option}`}
                      value={option}
                      className="mr-2 text-purple-600 focus:ring-purple-500 rounded"
                      {...register("usefulFeatures")}
                    />
                    <label htmlFor={`usefulFeatures-${option}`}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label className="block mb-2 font-medium">Aap kis language me content prefer karenge?</label>
              <div className="space-y-2">
                {["English", "Hindi", "Hinglish", "Regional Language (mention)"].map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      id={`preferredLanguage-${option}`}
                      value={option}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                      {...register("preferredLanguage", { required: "Please select a language" })}
                    />
                    <label htmlFor={`preferredLanguage-${option}`}>{option}</label>
                  </div>
                ))}
                {watchPreferredLanguage === "Regional Language (mention)" && (
                  <input
                    type="text"
                    className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Please specify"
                    {...register("preferredLanguageOther")}
                  />
                )}
              </div>
              {errors.preferredLanguage && <p className="text-red-500 mt-1">{errors.preferredLanguage.message}</p>}
            </div>
          </div>
        )}
        
        {currentSection === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="form-group">
              <label className="block mb-2 font-medium">Aapko kya lagta hai – Effectsup aapke career me help karega?</label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                placeholder="Share your thoughts..."
                {...register("appHelp")}
              ></textarea>
            </div>
            
            <div className="form-group">
              <label className="block mb-2 font-medium">Kya aap is app ka early access lena chahenge?</label>
              <div className="space-y-2">
                {["Haan", "Nahi", "Depends on features"].map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      id={`earlyAccess-${option}`}
                      value={option}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                      {...register("earlyAccess", { required: "Please select an option" })}
                    />
                    <label htmlFor={`earlyAccess-${option}`}>{option}</label>
                  </div>
                ))}
              </div>
              {errors.earlyAccess && <p className="text-red-500 mt-1">{errors.earlyAccess.message}</p>}
            </div>
            
            <div className="form-group">
              <label className="block mb-2 font-medium">Koi career struggle ya suggestion jo aap share karna chahte hain?</label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                placeholder="Share your thoughts..."
                {...register("suggestions")}
              ></textarea>
            </div>
          </div>
        )}
        
        <div className="flex justify-between mt-12">
          {currentSection > 0 ? (
            <button
              type="button"
              onClick={prevSection}
              className="flex items-center px-6 py-3 bg-white/5 border border-[#11cb5f]/20 text-white rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Previous
            </button>
          ) : (
            <div></div>
          )}
          
          {currentSection < sections.length - 1 ? (
            <button
              type="button"
              onClick={nextSection}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-[#11cb5f] to-[#24803d] text-white rounded-lg hover:opacity-95 transition-all glow btn-glow"
            >
              Next <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center px-8 py-3 bg-gradient-to-r from-[#11cb5f] to-[#24803d] text-white rounded-lg hover:opacity-95 transition-all glow btn-glow"
            >
              Submit <Check className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
