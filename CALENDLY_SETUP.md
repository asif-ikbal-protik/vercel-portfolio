# Calendly Integration Setup

This guide will help you set up Calendly integration in your portfolio.

## Step 1: Create a Calendly Account

1. Go to [calendly.com](https://calendly.com) and sign up for a free account
2. Complete your profile setup

## Step 2: Create an Event Type

1. In your Calendly dashboard, click "Create" or "New Event Type"
2. Choose "One-on-One" event type
3. Configure your event:
   - **Event Name**: "AI/ML Consultation" or "Portfolio Consultation"
   - **Duration**: 30 minutes (or your preferred duration)
   - **Description**: Add details about what you'll discuss
   - **Location**: Video call (Zoom, Google Meet, etc.)

## Step 3: Get Your Calendly URL

1. After creating your event, you'll get a URL like:
   ```
   https://calendly.com/your-username/event-name
   ```
2. Copy this URL

## Step 4: Update Your Portfolio

1. Open `client/src/config/calendly.ts`
2. Replace the placeholder URL with your actual Calendly URL:

```typescript
export const CALENDLY_CONFIG = {
  CALENDLY_URL: "https://calendly.com/your-actual-username/your-event-name",
  CONSULTATION_DURATION: "30-minute consultation",
  DESCRIPTION: "Let's discuss your AI/ML projects, automation needs, or data annotation requirements. Book a convenient time for a consultation."
};
```

## Step 5: Customize (Optional)

You can customize the widget by modifying:

- **Duration**: Update `CONSULTATION_DURATION` in the config
- **Description**: Update `DESCRIPTION` in the config
- **Styling**: Modify the CSS in `client/src/index.css` (look for `.glow-green` classes)

## Step 6: Test

1. Start your development server: `npm run dev`
2. Navigate to your portfolio
3. Go to the Contact section
4. Click "Book Consultation" to test the Calendly integration

## Features

The Calendly integration includes:

- ✅ Modern, responsive design matching your portfolio theme
- ✅ Green accent color with glow effects
- ✅ Popup widget that doesn't disrupt the user experience
- ✅ Easy configuration through a dedicated config file
- ✅ TypeScript support with proper type definitions
- ✅ Automatic script loading and cleanup

## Troubleshooting

**Widget doesn't open:**
- Check that your Calendly URL is correct
- Ensure your Calendly event is published and active
- Check browser console for any JavaScript errors

**Styling issues:**
- Verify that the CSS variables are properly defined in `index.css`
- Check that the `glow-green` classes are applied correctly

**Script loading issues:**
- The component automatically loads the Calendly script
- If you see console errors, check your internet connection

## Advanced Customization

You can further customize the widget by:

1. **Changing colors**: Modify the `--accent-green` CSS variable
2. **Adding more fields**: Extend the `CalendlyWidgetProps` interface
3. **Custom styling**: Add more CSS classes to the component
4. **Multiple event types**: Create multiple widgets with different URLs

## Security Notes

- The Calendly script is loaded from their official CDN
- No sensitive data is stored locally
- All scheduling happens through Calendly's secure platform 