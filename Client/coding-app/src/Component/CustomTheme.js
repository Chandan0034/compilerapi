export const customTheme = {
    base: 'vs-dark', // Use 'vs-dark' or 'vs' for light theme
    inherit: true,   // Inherit rules from the base theme
    rules: [
      { token: 'comment', foreground: '888888' }, // Customize token colors
      { token: 'keyword', foreground: 'FFA500' },
      // Add more token color rules as needed
    ],
    colors: {
      'editor.background': '#282C34', // Customize background color
      'editor.foreground': '#ABB2BF', // Customize foreground color
      // Add more color properties as needed
    },
  };