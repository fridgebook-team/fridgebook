const groqApiKey = process.env.GROQ_API_KEY;

if (!groqApiKey) {
  console.warn('GROQ_API_KEY ist nicht gesetzt. KI-Rezeptgenerierung wird fehlschlagen.');
}

module.exports = {
  '/api/groq': {
    target: 'https://api.groq.com',
    secure: true,
    changeOrigin: true,
    pathRewrite: {
      '^/api/groq': '',
    },
    headers: {
      Authorization: `Bearer ${groqApiKey ?? ''}`,
    },
  },
};
