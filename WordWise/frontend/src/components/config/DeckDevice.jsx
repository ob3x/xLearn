import api from "./AxiosConfig"
 

export const getDecks = async () => {
  try {
    const response = await api.get("http://localhost:8000/decks/get-deck")
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania decków:", error);
    throw error;
  }
};
