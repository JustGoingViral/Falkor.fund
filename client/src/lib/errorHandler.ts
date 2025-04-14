// Mark Twain-style humorous error messages
export const getHumorousErrorMessage = (error: any): string => {
  // Check if the error contains a Replit domain or reference
  const errorString = String(error).toLowerCase();
  const errorMessage = error?.message || String(error);
  
  // Specific error types
  if (errorString.includes('network') || errorString.includes('fetch') || errorString.includes('connection')) {
    return "The river of data has run dry! As I once said on the Mississippi, 'Sometimes you're the steamboat, sometimes you're the snag.'";
  }
  
  if (errorString.includes('timeout') || errorString.includes('timed out')) {
    return "This request is slower than a Mississippi paddle steamer in molasses. Might want to try again when the current's stronger.";
  }
  
  if (errorString.includes('auth') || errorString.includes('permission') || errorString.includes('access')) {
    return "You're attempting to enter waters without the proper papers. A wise man once said, 'It's easier to fool people than to convince them they have been fooled.'";
  }
  
  if (errorString.includes('not found') || errorString.includes('404')) {
    return "I've searched high and low like Huck Finn on an adventure, but this item seems to have floated downriver.";
  }
  
  if (errorString.includes('invalid') || errorString.includes('syntax')) {
    return "That input's as crooked as a politician's promise. Perhaps try a more honest approach.";
  }
  
  // Default fallback
  return "Well butter my biscuit, something's gone awry. As I always say, 'It ain't what you don't know that gets you into trouble. It's what you know for sure that just ain't so.'";
};

// Replace any references to Replit in error messages
export const sanitizeErrorMessage = (message: string): string => {
  // Replace any variation of Createassistants.com, Createassistants.dev, etc.
  return message
    .replace(/Createassistants\.(com|dev|app|co)/gi, 'createassistants.com')
    .replace(/Createassistants/gi, 'Createassistants')
    .replace(/\.Createassistants/gi, '.createassistants');
};

// Main error handler function
export const handleError = (error: any): string => {
  const humorousMessage = getHumorousErrorMessage(error);
  return sanitizeErrorMessage(humorousMessage);
};

// Use this to wrap async operations
export const withErrorHandling = async <T>(
  promiseFn: () => Promise<T>, 
  fallback?: T
): Promise<T> => {
  try {
    return await promiseFn();
  } catch (error) {
    console.error('Original error:', error);
    const message = handleError(error);
    throw new Error(message);
  }
};