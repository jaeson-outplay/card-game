# Remote Card Generation Guide

This guide explains how to create cards with images on your remote database.

## Prerequisites

1. A deployed API server (e.g., on Render)
2. Node.js installed on your local machine
3. Axios package installed (`npm install axios`)

## Card Creation Script

Create a file named `create-remote-card.js` with the following content:

```javascript
/**
 * Create Cards for Remote API
 * 
 * This script creates new cards on the remote API and generates images for them.
 */

const axios = require('axios');
require('dotenv').config();

// Remote API endpoint - Replace with your own deployed API URL
const API_BASE_URL = 'https://card-game-nw9f.onrender.com/api';
const CARDS_ENDPOINT = `${API_BASE_URL}/cards`;

async function createCard(cardData) {
  try {
    console.log(`Creating card: ${cardData.name}`);
    const response = await axios.post(CARDS_ENDPOINT, cardData);
    console.log(`Card created successfully with ID: ${response.data._id}`);
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error(`Error creating card ${cardData.name}:`, error.message);
    if (error.response) {
      console.error('API response:', error.response.data);
    }
    throw error;
  }
}

// Generate image for card using the API endpoint
async function generateCardImage(cardId) {
  try {
    console.log(`Generating image for card with ID: ${cardId}`);
    const response = await axios.post(`${CARDS_ENDPOINT}/${cardId}/generate-image`);
    console.log('Image generated successfully');
    return response.data.card;
  } catch (error) {
    console.error('Error generating image:', error.message);
    if (error.response) {
      console.error('API response:', error.response.data);
    }
    throw error;
  }
}

// Define your cards here
const cards = [
  // Example minion card
  {
    name: "Your Card Name",
    type: "minion",  // Can be 'minion' or 'spell' only
    cost: 3,
    attack: 3,
    health: 4,
    description: "Card effect description",
    flavorText: "Flavor text for the card",
    rarity: "rare"  // common, rare, epic, or legendary
  }
];

// Main function to create cards with images
async function createCardsWithImages() {
  for (const cardData of cards) {
    try {
      // 1. Create the card
      const createdCard = await createCard(cardData);
      
      // 2. Generate image for the card
      try {
        await generateCardImage(createdCard._id);
        console.log(`Image generated for ${cardData.name}`);
      } catch (imageError) {
        console.error(`Failed to generate image for ${cardData.name}:`, imageError.message);
      }
      
      // Add a delay between card creations
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to create card ${cardData.name}:`, error);
    }
  }
}

// Execute the function
createCardsWithImages()
  .then(() => console.log('All cards created successfully!'))
  .catch(err => console.error('Script failed:', err));
```

## Using the Script

1. **Update the API URL**
   - Replace `https://card-game-nw9f.onrender.com/api` with your deployed API URL

2. **Define Your Cards**
   - Edit the `cards` array to include the cards you want to create
   - Make sure to only use valid types (`minion` or `spell`)
   - Include all required properties for each card type

3. **Run the Script**
   ```
   node create-remote-card.js
   ```

4. **View Your Cards**
   - Open the MongoDB Card Viewer and enter your API URL
   - You should see your cards with their generated images

## Example Cards

Here are some example card definitions you can use:

### Knight-themed Cards

```javascript
const cards = [
  // Common minion
  {
    name: "Squire",
    type: "minion",
    cost: 1,
    attack: 1,
    health: 2,
    description: "Battlecry: Give a friendly Knight +1/+1.",
    flavorText: "One day, he hopes to earn his spurs and become a true knight.",
    rarity: "common"
  },
  
  // Rare minion
  {
    name: "Holy Knight",
    type: "minion",
    cost: 5,
    attack: 4,
    health: 6,
    description: "Divine Shield. Battlecry: Restore 3 health to your hero.",
    flavorText: "Blessed by the light, his armor shines with divine purpose.",
    rarity: "rare"
  },
  
  // Common spell
  {
    name: "Knight's Vow",
    type: "spell",
    cost: 2,
    description: "Give a minion Taunt and 'Can't be targeted by spells or Hero Powers.'",
    flavorText: "A knight's oath is unbreakable, even in the face of certain death.",
    rarity: "common"
  }
];
```

## Troubleshooting

1. **CORS Errors**
   - Make sure your API server has proper CORS configuration
   - For development, you can allow all origins: `app.use(cors({ origin: '*' }))`

2. **Image Generation Fails**
   - Check if your API server has access to the Hugging Face API
   - Ensure the `HUGGINGFACE_API_KEY` is properly set in the environment variables on your deployment

3. **API Connection Issues**
   - Verify that your API URL is correct and the server is running
   - On Render's free tier, the server may spin down after inactivity - it might need a minute to restart

4. **Rate Limiting**
   - If you're creating many cards in succession, you might hit rate limits
   - Increase the delay between card creations (e.g., to 2000ms) 