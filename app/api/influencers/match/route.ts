import { NextRequest, NextResponse } from 'next/server';

// Define types for the API
interface InfluencerMatch {
  name: string;
  platform: string;
  followers: string;
  engagement: string;
  niche: string;
  details: string;
  values: string[];
  vibeScore: number;
  audienceAlignment: number;
  contentStyle: string;
}

interface RequestBody {
  brand: string;
  influencer: string;
  brandValues: string[];
  missionStatement: string;
  targetEmotion: string;
}

// Mock database of influencers
const influencerDatabase: InfluencerMatch[] = [
  { 
    name: "Emma Thompson", 
    platform: "YouTube",
    followers: "1.2M",
    engagement: "4.8%",
    niche: "Sustainable Fashion",
    details: "Creates authentic content focused on sustainable fashion and lifestyle. Emma's content reflects a deep commitment to environmental causes, aligning perfectly with brands that prioritize sustainability and ethical practices.",
    values: ["Sustainability", "Authenticity", "Community"],
    vibeScore: 92,
    audienceAlignment: 88,
    contentStyle: "Educational & Inspirational"
  },
  { 
    name: "Michael Chen", 
    platform: "Instagram",
    followers: "850K",
    engagement: "5.2%",
    niche: "Tech & Lifestyle",
    details: "Michael's analytical approach to tech reviews connects with audiences seeking honesty and depth. His vibe balances innovation with accessibility, making complex topics approachable.",
    values: ["Innovation", "Authenticity", "Education"],
    vibeScore: 87,
    audienceAlignment: 79,
    contentStyle: "Analytical & Instructive"
  },
  { 
    name: "Sophia Rodriguez", 
    platform: "TikTok",
    followers: "2.4M",
    engagement: "7.1%",
    niche: "Beauty & Wellness",
    details: "Sophia creates content that celebrates self-expression and holistic wellness. Her vibrant energy and inclusive approach resonate with younger audiences seeking authenticity in beauty content.",
    values: ["Inclusivity", "Wellness", "Empowerment"],
    vibeScore: 94,
    audienceAlignment: 91,
    contentStyle: "Energetic & Transformational"
  },
  {
    name: "Jackson Wright",
    platform: "Instagram",
    followers: "1.5M",
    engagement: "4.3%",
    niche: "Adventure & Travel",
    details: "Jackson's content captures breathtaking landscapes and adrenaline-filled adventures. His authentic storytelling inspires viewers to explore the outdoors and respect nature.",
    values: ["Adventure", "Sustainability", "Authenticity"],
    vibeScore: 89,
    audienceAlignment: 82,
    contentStyle: "Visual & Narrative"
  },
  {
    name: "Aisha Patel",
    platform: "YouTube",
    followers: "970K",
    engagement: "6.2%",
    niche: "Educational Content",
    details: "Aisha breaks down complex topics in science and technology with clarity and enthusiasm. Her content is both informative and entertaining, appealing to curious minds.",
    values: ["Education", "Innovation", "Inclusivity"],
    vibeScore: 91,
    audienceAlignment: 85,
    contentStyle: "Informative & Engaging"
  }
];

// Algorithm to match brand with influencers
function matchInfluencers(data: RequestBody): InfluencerMatch[] {
  // In a real implementation, this would use more sophisticated matching algorithms
  // For now, we'll simulate matching based on brand values and target emotions
  
  // Sort influencers by a combination of value match and randomly simulated audience match
  return influencerDatabase
    .map(influencer => {
      // Calculate value match score based on common values
      const valueMatchCount = influencer.values.filter(value => 
        data.brandValues.includes(value)).length;
      
      // Calculate a match score (in a real app, this would be more sophisticated)
      const valueScore = data.brandValues.length > 0 
        ? (valueMatchCount / data.brandValues.length) * 100 
        : 50;
      
      // Adjust scores based on other factors (simulated)
      const mentionedInDescription = 
        (data.influencer.toLowerCase().includes(influencer.niche.toLowerCase()) || 
         data.brand.toLowerCase().includes(influencer.niche.toLowerCase()));
      
      const contentBonus = mentionedInDescription ? 10 : 0;
      
      // Adjust the original scores slightly for variety
      const adjustedVibeScore = Math.min(100, Math.max(70, 
        Math.round(influencer.vibeScore * 0.7 + valueScore * 0.3 + contentBonus)
      ));
      
      const adjustedAudienceScore = Math.min(100, Math.max(65, 
        Math.round(influencer.audienceAlignment * 0.8 + (Math.random() * 10))
      ));
      
      // Return modified influencer with adjusted scores
      return {
        ...influencer,
        vibeScore: adjustedVibeScore,
        audienceAlignment: adjustedAudienceScore
      };
    })
    .sort((a, b) => b.vibeScore - a.vibeScore)
    .slice(0, 3); // Return top 3 matches
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data: RequestBody = await request.json();
    
    // Validate required fields
    if (!data.brand || !data.influencer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Simulate processing time to make it feel real
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Get matching influencers
    const matches = matchInfluencers(data);
    
    // Return the matches
    return NextResponse.json({ matches });
    
  } catch (error) {
    console.error("Error processing influencer match request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
