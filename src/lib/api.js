const FIREBASE_DOMAIN = [] //"insert database domain here";

export const getAllQuotes = async () => {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "could not fetch quotes.");
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
};

export const getSingleQuote = async (quoteId) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "could not fetch quote");
  }

  const loadedQuote = {
    id: quoteId,
    ...data,
  };

  return loadedQuote;
};

export const addQuote = async (quoteData) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
    method: "POST",
    body: JSON.stringify(quoteData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "could not send data!");
  }

  return null;
};

export const addComment = async (requestData) => {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.commentData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "could not add coment!");
  }

  return {
    commentId: data.name,
  };
};

export const getAllComments = async (quoteId) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "could not load comments!");
  }

  const loadedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    loadedComments.push(commentObj);
  }

  return loadedComments;
};
