import { GoogleGenAI, Type } from "@google/genai";
import type { EvaluationResult, DomainDetails, User } from '../types';

// FIX: Initialize GoogleGenAI directly with the environment variable as per guidelines.
// This removes the unnecessary warning and the hardcoded fallback API key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const collegeSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING },
        url: { type: Type.STRING },
    },
};

export async function getCareerPrediction(answers: { [key: number]: string }): Promise<EvaluationResult> {
    const prompt = `
        An engineering student has answered a 10-question aptitude and interest assessment. Based on their answers, predict the most suitable engineering domain for them. Provide a personalized roadmap, learning paths, essential tools, relevant certification courses, and a list of top 5 engineering colleges in Tamil Nadu, India for that domain.

        Student's Answers:
        ${Object.entries(answers).map(([qid, answer]) => `Question ${qid}: ${answer}`).join('\n')}

        Return the response in a structured JSON format.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        domain: { type: Type.STRING, description: "The recommended engineering domain." },
                        reasoning: { type: Type.STRING, description: "A brief explanation for the recommendation." },
                        roadmap: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    step: { type: Type.STRING },
                                    description: { type: Type.STRING },
                                }
                            }
                        },
                        tools: { type: Type.ARRAY, items: { type: Type.STRING } },
                        certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
                        colleges: { type: Type.ARRAY, items: collegeSchema },
                    }
                }
            }
        });

        const jsonString = response.text.trim();
        return JSON.parse(jsonString) as EvaluationResult;

    } catch (error) {
        console.error("Error fetching career prediction:", error);
        throw new Error("Failed to get career prediction from AI. Please check your API key and try again.");
    }
}


export async function getDomainInfo(domainName: string): Promise<DomainDetails> {
    const prompt = `
        Provide a detailed overview of the "${domainName}" engineering department. 
        Include:
        1. A general overview of the field.
        2. A list of the top 5 recommended engineering colleges in Tamil Nadu, India for this domain.
        3. A list of 5-7 relevant certification courses.
        4. A list of top NPTEL resources (courses or playlists) with their URLs.

        Return the response in a structured JSON format.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        overview: { type: Type.STRING, description: "Detailed overview of the domain." },
                        colleges: { type: Type.ARRAY, items: collegeSchema },
                        certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
                        nptelResources: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    url: { type: Type.STRING },
                                }
                            }
                        }
                    }
                }
            }
        });
        
        const jsonString = response.text.trim();
        return JSON.parse(jsonString) as DomainDetails;
    } catch (error) {
        console.error(`Error fetching domain info for ${domainName}:`, error);
        throw new Error("Failed to get domain information from AI. Please check your API key and try again.");
    }
}

export async function getAiTip(): Promise<{ quote: string; tip: string }> {
    const prompt = `
        Generate a JSON object with two properties: "quote" and "tip".
        - "quote": A short, motivational quote suitable for a student.
        - "tip": A concise, actionable career or learning tip for an engineering student.
    `;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        quote: { type: Type.STRING },
                        tip: { type: Type.STRING },
                    }
                }
            }
        });
        const jsonString = response.text.trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error fetching AI tip:", error);
        return { quote: "The best way to predict the future is to create it.", tip: "Spend 15 minutes today exploring a new library or tool in your field." };
    }
}

export async function getLearningRoadmap(domain: string): Promise<{ step: string; description: string; resources: { name: string, url: string }[] }[]> {
    const prompt = `
        Create a detailed, step-by-step learning roadmap for a student interested in "${domain}".
        For each step, provide a title, a brief description, and a list of 2-3 recommended online resources (like W3Schools, GeeksforGeeks, NPTEL, Coursera, YouTube channels) with their names and URLs.
        The roadmap should cover foundational knowledge to advanced topics.
        Return the response in a structured JSON format.
    `;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            step: { type: Type.STRING },
                            description: { type: Type.STRING },
                            resources: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        name: { type: Type.STRING },
                                        url: { type: Type.STRING },
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        const jsonString = response.text.trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error fetching learning roadmap:", error);
        throw new Error("Failed to generate learning roadmap.");
    }
}

export async function getJobRecommendations(user: User): Promise<{ title: string; company: string; reason: string }[]> {
    const prompt = `
        Based on the following student profile, recommend 3 suitable job titles. For each, provide the job title, a mock company name, and a short reason why it's a good fit.
        - Education Level: ${user.educationLevel}
        - Institution: ${user.institutionName}
        - Technical Skills: ${user.skills.technical.join(', ')}
        - Soft Skills: ${user.skills.soft.join(', ')}

        Return the response as a JSON array of objects.
    `;
     try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            company: { type: Type.STRING },
                            reason: { type: Type.STRING },
                        }
                    }
                }
            }
        });
        const jsonString = response.text.trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error fetching job recommendations:", error);
        throw new Error("Failed to generate job recommendations.");
    }
}