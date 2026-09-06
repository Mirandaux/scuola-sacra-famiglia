module.exports = {
  content: [
    './index.html',
    './*.js'
  ],
  theme: {
    extend: {
      colors: {
        sage: { DEFAULT: '#1A6B5A', dark: '#135245', light: '#E8F5F1' },
        gold: { DEFAULT: '#A66208', light: '#FFD98F', dark: '#8A5207' },
        cream: '#FCF9F5',
        ink: '#2D3436'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      borderRadius: { '4xl': '2rem', '5xl': '2.5rem' }
    }
  }
}
