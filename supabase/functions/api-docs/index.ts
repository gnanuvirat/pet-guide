
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const apiDocs = {
  openapi: "3.0.0",
  info: {
    title: "Pet Guide API",
    description: "API for Pet Guide application that allows users to upload pet media, analyze pet behavior and health, get recommendations, and chat with an AI assistant.",
    version: "1.0.0",
    contact: {
      email: "support@petguide.com"
    }
  },
  servers: [
    {
      url: "https://wxpkzqebqadcnipypigi.supabase.co/functions/v1",
      description: "Supabase Edge Functions"
    }
  ],
  tags: [
    { name: "Authentication", description: "Authentication operations" },
    { name: "Media", description: "Media upload and analysis operations" },
    { name: "Pets", description: "Pet profile management" },
    { name: "Analysis", description: "Pet analysis results" },
    { name: "Chatbot", description: "AI assistant interactions" }
  ],
  paths: {
    "/auth/google": {
      get: {
        tags: ["Authentication"],
        summary: "Initiate Google OAuth flow",
        responses: {
          "302": {
            description: "Redirect to Google authentication"
          }
        }
      }
    },
    "/auth/google/callback": {
      get: {
        tags: ["Authentication"],
        summary: "Handle Google OAuth callback",
        responses: {
          "200": {
            description: "Successfully authenticated",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string" },
                    user: { $ref: "#/components/schemas/User" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/media/upload": {
      post: {
        tags: ["Media"],
        summary: "Upload pet image or video",
        security: [{ BearerAuth: [] }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  file: { type: "string", format: "binary" },
                  petId: { type: "string", format: "uuid" },
                  mediaType: { type: "string", enum: ["image", "video"] },
                  description: { type: "string" }
                },
                required: ["file", "mediaType"]
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Media uploaded successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string", format: "uuid" },
                    url: { type: "string", format: "uri" },
                    analysisId: { type: "string", format: "uuid" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/media/{mediaId}": {
      get: {
        tags: ["Media"],
        summary: "Get media details",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "mediaId",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" }
          }
        ],
        responses: {
          "200": {
            description: "Media details retrieved",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Media" }
              }
            }
          }
        }
      },
      delete: {
        tags: ["Media"],
        summary: "Delete media",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "mediaId",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" }
          }
        ],
        responses: {
          "204": { description: "Media deleted successfully" }
        }
      }
    },
    "/analysis/image": {
      post: {
        tags: ["Analysis"],
        summary: "Analyze pet image for breed and age",
        security: [{ BearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  mediaId: { type: "string", format: "uuid" }
                },
                required: ["mediaId"]
              }
            }
          }
        },
        responses: {
          "202": {
            description: "Analysis started",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    analysisId: { type: "string", format: "uuid" },
                    status: { type: "string", enum: ["pending", "processing", "completed", "failed"] }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/analysis/video": {
      post: {
        tags: ["Analysis"],
        summary: "Analyze pet video for behavior",
        security: [{ BearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  mediaId: { type: "string", format: "uuid" }
                },
                required: ["mediaId"]
              }
            }
          }
        },
        responses: {
          "202": {
            description: "Analysis started",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    analysisId: { type: "string", format: "uuid" },
                    status: { type: "string", enum: ["pending", "processing", "completed", "failed"] }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/analysis/{analysisId}": {
      get: {
        tags: ["Analysis"],
        summary: "Get analysis results",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "analysisId",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" }
          }
        ],
        responses: {
          "200": {
            description: "Analysis results",
            content: {
              "application/json": {
                schema: {
                  oneOf: [
                    { $ref: "#/components/schemas/ImageAnalysis" },
                    { $ref: "#/components/schemas/VideoAnalysis" }
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/recommendations": {
      get: {
        tags: ["Analysis"],
        summary: "Get recommendations based on analysis",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "petId",
            in: "query",
            required: true,
            schema: { type: "string", format: "uuid" }
          },
          {
            name: "type",
            in: "query",
            schema: { type: "string", enum: ["health", "training", "care"] }
          }
        ],
        responses: {
          "200": {
            description: "Recommendations",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Recommendation" }
                }
              }
            }
          }
        }
      }
    },
    "/pets": {
      get: {
        tags: ["Pets"],
        summary: "List user's pets",
        security: [{ BearerAuth: [] }],
        responses: {
          "200": {
            description: "List of pets",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Pet" }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Pets"],
        summary: "Create a new pet profile",
        security: [{ BearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  species: { type: "string" },
                  breed: { type: "string" },
                  birthdate: { type: "string", format: "date" },
                  gender: { type: "string", enum: ["male", "female", "unknown"] },
                  weight: { type: "number" },
                  profileImageUrl: { type: "string", format: "uri" }
                },
                required: ["name", "species"]
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Pet profile created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Pet" }
              }
            }
          }
        }
      }
    },
    "/pets/{petId}": {
      get: {
        tags: ["Pets"],
        summary: "Get pet details",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "petId",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" }
          }
        ],
        responses: {
          "200": {
            description: "Pet details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Pet" }
              }
            }
          }
        }
      },
      put: {
        tags: ["Pets"],
        summary: "Update pet details",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "petId",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" }
          }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  species: { type: "string" },
                  breed: { type: "string" },
                  birthdate: { type: "string", format: "date" },
                  gender: { type: "string", enum: ["male", "female", "unknown"] },
                  weight: { type: "number" },
                  profileImageUrl: { type: "string", format: "uri" }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Pet updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Pet" }
              }
            }
          }
        }
      },
      delete: {
        tags: ["Pets"],
        summary: "Delete pet profile",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "petId",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" }
          }
        ],
        responses: {
          "204": { description: "Pet deleted successfully" }
        }
      }
    },
    "/chatbot/message": {
      post: {
        tags: ["Chatbot"],
        summary: "Send message to AI assistant",
        security: [{ BearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  conversationId: { type: "string", format: "uuid" },
                  petId: { type: "string", format: "uuid" }
                },
                required: ["message"]
              }
            }
          }
        },
        responses: {
          "200": {
            description: "AI response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    response: { type: "string" },
                    conversationId: { type: "string", format: "uuid" },
                    messageId: { type: "string", format: "uuid" },
                    suggestions: {
                      type: "array",
                      items: { type: "string" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/chatbot/conversations": {
      get: {
        tags: ["Chatbot"],
        summary: "Get user conversations",
        security: [{ BearerAuth: [] }],
        responses: {
          "200": {
            description: "List of conversations",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Conversation" }
                }
              }
            }
          }
        }
      }
    },
    "/chatbot/conversations/{conversationId}": {
      get: {
        tags: ["Chatbot"],
        summary: "Get conversation history",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "conversationId",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" }
          }
        ],
        responses: {
          "200": {
            description: "Conversation messages",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Message" }
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ["Chatbot"],
        summary: "Delete a conversation",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "conversationId",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" }
          }
        ],
        responses: {
          "204": { description: "Conversation deleted successfully" }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          email: { type: "string", format: "email" },
          name: { type: "string" },
          avatarUrl: { type: "string", format: "uri" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      Pet: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          userId: { type: "string", format: "uuid" },
          name: { type: "string" },
          species: { type: "string" },
          breed: { type: "string" },
          birthdate: { type: "string", format: "date" },
          gender: { type: "string", enum: ["male", "female", "unknown"] },
          weight: { type: "number" },
          profileImageUrl: { type: "string", format: "uri" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      Media: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          userId: { type: "string", format: "uuid" },
          petId: { type: "string", format: "uuid" },
          type: { type: "string", enum: ["image", "video"] },
          url: { type: "string", format: "uri" },
          thumbnailUrl: { type: "string", format: "uri" },
          description: { type: "string" },
          analysisId: { type: "string", format: "uuid" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      ImageAnalysis: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          mediaId: { type: "string", format: "uuid" },
          petId: { type: "string", format: "uuid" },
          status: { type: "string", enum: ["pending", "processing", "completed", "failed"] },
          species: { type: "string" },
          breed: { type: "string" },
          breedConfidence: { type: "number" },
          estimatedAge: { type: "string" },
          ageConfidence: { type: "number" },
          healthIndicators: {
            type: "object",
            properties: {
              coatCondition: { type: "string" },
              eyeClarity: { type: "string" },
              bodyCondition: { type: "string" }
            }
          },
          createdAt: { type: "string", format: "date-time" },
          completedAt: { type: "string", format: "date-time" }
        }
      },
      VideoAnalysis: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          mediaId: { type: "string", format: "uuid" },
          petId: { type: "string", format: "uuid" },
          status: { type: "string", enum: ["pending", "processing", "completed", "failed"] },
          behaviors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                behavior: { type: "string" },
                confidence: { type: "number" },
                startTime: { type: "number" },
                endTime: { type: "number" },
                description: { type: "string" }
              }
            }
          },
          activityLevel: {
            type: "object",
            properties: {
              level: { type: "string", enum: ["low", "moderate", "high"] },
              score: { type: "number" }
            }
          },
          mood: {
            type: "object",
            properties: {
              primary: { type: "string" },
              confidence: { type: "number" },
              secondary: { type: "string" }
            }
          },
          createdAt: { type: "string", format: "date-time" },
          completedAt: { type: "string", format: "date-time" }
        }
      },
      Recommendation: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          petId: { type: "string", format: "uuid" },
          analysisId: { type: "string", format: "uuid" },
          type: { type: "string", enum: ["health", "training", "care"] },
          title: { type: "string" },
          description: { type: "string" },
          priority: { type: "string", enum: ["low", "medium", "high"] },
          actionItems: {
            type: "array",
            items: { type: "string" }
          },
          sources: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                url: { type: "string", format: "uri" }
              }
            }
          },
          createdAt: { type: "string", format: "date-time" }
        }
      },
      Conversation: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          userId: { type: "string", format: "uuid" },
          petId: { type: "string", format: "uuid" },
          title: { type: "string" },
          lastMessagePreview: { type: "string" },
          messageCount: { type: "integer" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      Message: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          conversationId: { type: "string", format: "uuid" },
          sender: { type: "string", enum: ["user", "assistant"] },
          content: { type: "string" },
          createdAt: { type: "string", format: "date-time" }
        }
      }
    }
  }
};

// Implementation plan details
const implementationPlan = {
  databaseSchema: {
    description: "Required database tables for the Pet Guide API",
    tables: [
      {
        name: "pets",
        description: "Stores pet profiles",
        columns: [
          "id (uuid, primary key)",
          "user_id (uuid, foreign key to auth.users)",
          "name (text, not null)",
          "species (text, not null)",
          "breed (text)",
          "birthdate (date)",
          "gender (text)",
          "weight (numeric)",
          "profile_image_url (text)",
          "created_at (timestamp with time zone)",
          "updated_at (timestamp with time zone)"
        ]
      },
      {
        name: "media",
        description: "Stores uploaded pet images and videos",
        columns: [
          "id (uuid, primary key)",
          "user_id (uuid, foreign key to auth.users)",
          "pet_id (uuid, foreign key to pets)",
          "type (text, not null, either 'image' or 'video')",
          "url (text, not null)",
          "thumbnail_url (text)",
          "description (text)",
          "analysis_id (uuid)",
          "created_at (timestamp with time zone)",
          "updated_at (timestamp with time zone)"
        ]
      },
      {
        name: "analyses",
        description: "Stores analysis results from media",
        columns: [
          "id (uuid, primary key)",
          "media_id (uuid, foreign key to media)",
          "pet_id (uuid, foreign key to pets)",
          "type (text, not null, either 'image' or 'video')",
          "status (text, not null)",
          "results (jsonb)",
          "created_at (timestamp with time zone)",
          "completed_at (timestamp with time zone)"
        ]
      },
      {
        name: "recommendations",
        description: "Stores recommendations based on analyses",
        columns: [
          "id (uuid, primary key)",
          "pet_id (uuid, foreign key to pets)",
          "analysis_id (uuid, foreign key to analyses)",
          "type (text, not null)",
          "title (text, not null)",
          "description (text)",
          "priority (text)",
          "action_items (jsonb)",
          "sources (jsonb)",
          "created_at (timestamp with time zone)"
        ]
      },
      {
        name: "conversations",
        description: "Stores chatbot conversations",
        columns: [
          "id (uuid, primary key)",
          "user_id (uuid, foreign key to auth.users)",
          "pet_id (uuid, foreign key to pets)",
          "title (text)",
          "created_at (timestamp with time zone)",
          "updated_at (timestamp with time zone)"
        ]
      },
      {
        name: "messages",
        description: "Stores chatbot messages",
        columns: [
          "id (uuid, primary key)",
          "conversation_id (uuid, foreign key to conversations)",
          "sender (text, not null, either 'user' or 'assistant')",
          "content (text, not null)",
          "created_at (timestamp with time zone)"
        ]
      }
    ]
  },
  integrations: [
    {
      name: "Google OAuth",
      description: "Authentication with Google accounts",
      implementation: "Use Supabase Auth with Google provider"
    },
    {
      name: "Image Recognition API",
      description: "For pet breed and age detection",
      options: ["Google Cloud Vision API", "Azure Computer Vision", "Custom TensorFlow model"]
    },
    {
      name: "Video Analysis API",
      description: "For pet behavior analysis",
      options: ["AWS Rekognition", "Google Video Intelligence API", "Custom ML pipeline"]
    },
    {
      name: "AI Chatbot",
      description: "For pet care assistant",
      options: ["OpenAI API", "Anthropic Claude", "Google Gemini", "Custom fine-tuned model"]
    },
    {
      name: "Storage",
      description: "For storing media files",
      implementation: "Supabase Storage"
    }
  ],
  securityConsiderations: [
    "All endpoints except authentication require valid JWT",
    "Row-level security enforced at database level",
    "Rate limiting on API endpoints",
    "Secure file upload validation",
    "Data encryption for sensitive information",
    "Regular security audits and penetration testing"
  ],
  deploymentStrategy: {
    infrastructure: "Serverless edge functions on Supabase platform",
    scaling: "Automatic scaling based on demand",
    regions: "Deploy across multiple regions for lower latency",
    monitoring: "Set up monitoring and alerts for errors and performance issues"
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Return API documentation
  const response = {
    apiSpecification: apiDocs,
    implementationPlan: implementationPlan,
    message: "This is the complete API architecture for the Pet Guide application."
  };

  return new Response(
    JSON.stringify(response, null, 2),
    { 
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      } 
    }
  );
});
